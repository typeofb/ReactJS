class Game {
    squareClass = "";
    jumpClass = "";
    status = null;
    moves = null;

    xIsNext = true;
    stepNumber= 0;
    history = [{ squares: Array(9).fill(null), }];

    constructor(squareClass, jumpClass, status, moves) {
        this.squareClass = squareClass;
        this.jumpClass = jumpClass;
        this.status = status;
        this.moves = moves;
        this.eventListeners();
    }

    eventListeners() {
        $(this.squareClass).click( e => {
            this.squareClick(e);
        });
        /*
        document.querySelectorAll(this.squareClass).forEach( element => element.addEventListener("click", e => {
            this.squareClick(e);
        }));
        */

        $(document).on("click", this.jumpClass, e => {
            this.jumpClick(e);
        });
        /*
        document.addEventListener("click", e => {
            if(e.target.className == this.jumpClass.substring(1))
                this.jumpClick(e);
        });
        */
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    squareClick(e) {
        const history = this.history.slice(0, this.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        let i = $(e.target).attr("num");
        //let i = e.target.getAttribute("num");
        if (this.calculateWinner(squares) || squares[i]) return;

        squares[i] = this.xIsNext ? 'X' : 'O';

        this.history = history.concat([{ squares: squares }]);
        this.stepNumber = history.length;
        this.xIsNext = !this.xIsNext;

        $(e.target).html(squares[i]);
        //e.target.innerHTML = squares[i];

        this.updateStatus();
    }

    jumpClick(e) {
        const key = Number.parseInt($(e.target).closest("li").attr("key"));
        //const key = Number.parseInt(e.target.closest("li").getAttribute("key"));
        this.stepNumber = key;
        this.xIsNext = (key%2) == 0
        this.updateSquares();
    }

    updateStatus() {
        const history = this.history;
        const current = history[this.stepNumber];
        const winner = this.calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';

            return Handlebars.compile([
                "<li key={{move}}>",
                "   <button class='jump'>{{desc}}</button>",
                "</li>"
            ].join(""))
            ({"move": move, "desc": desc});
        });

        let status = 'Next player: ' + (this.xIsNext ? 'X' : 'O');
        if (winner) status = 'Winner: ' + winner;

        $(this.status).html(status);
        //this.status.innerHTML = status;

        $(this.moves).html(moves);
        //this.moves.innerHTML = moves.join("");
    }

    updateSquares() {
        const current = this.history[this.stepNumber];
        current.squares.forEach((value,i) => {
            $(this.squareClass).siblings('[num=' + i + ']').html(value);
            //document.querySelector(this.squareClass + '[num="' + i + '"]').innerHTML = value;
        });
    }
}

$(document).ready(() => {
    new Game(".square", ".jump", $("#status"), $("#moves"));
});
/*
document.addEventListener("DOMContentLoaded", () => {
    new Game(".square", ".jump", document.querySelector("#status"), document.querySelector("#moves"));
});
*/