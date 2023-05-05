import {useContext, useEffect, useState} from "react";
import {TokenContextUpdated} from "./TokenContextUpdated";
import {
    gameInfoUpdate,
    getAllGames,
    joinGameFunction,
    makeMoveFunction,
    setNameFunction,
    startGameFunction
} from "./allFetchesUpdated";



function ThePageOfEverything() {
    const {token} = useContext(TokenContextUpdated)
    const [players, setPlayers] = useState([])
    const [gameId, setGameId] = useState("No Game id atm")
    const [name, setname] = useState("Steffis")
    const [showMoves, setShowMoves] = useState(false)
    const [showGames, setShowGames] = useState(false)
    const [showWaitingForMove, setShowWaitingForMove] = useState(false)
    const [showSetName, setShowSetName] = useState(true)
    const [showWin, setShowWin] = useState(false)
    const [showLose, setShowLose] = useState(false)
    const [showDraw, setShowDraw] = useState(false)
    const [showGameList ,setShowGameList] = useState(false)
    const [lookForMove, setLookForMove] = useState(false)
    const interval = setInterval(updateGameStatus, 500);
    const [winOrLose, setWinOrLose] = useState(false)



    const makePlayerMoveStone = () => {
        setShowMoves(false)
        setShowWaitingForMove(true)
        setWinOrLose(true)
        makeMoveFunction(token, "ROCK")
            .then(response => {
                console.log(response)
            })
    }
    const makePlayerMoveScissor = () => {
        setShowMoves(false)
        setShowWaitingForMove(true)
        setWinOrLose(true)
        makeMoveFunction(token, "SCISSORS")
            .then(response => {
                console.log(response)
            })
    }
    const makePlayerMovePaper = () => {
        setShowMoves(false)
        setShowWaitingForMove(true)
        setWinOrLose(true)
        makeMoveFunction(token, "PAPER")
            .then(response => {
                console.log(response)
            })
    }

    const setAnonymousPlayer = () => {
        setShowSetName(false)
        setShowGames(true)
        setNameFunction(token, name.toString())
            .then(response => {
                console.log(response)
            })
    }
    const newGame = () => {
        setWinOrLose(false)
        setShowWin(false)
        setShowLose(false)
        setShowDraw(false)
        setShowGames(true)
    }

    function updateGameStatus(){
        if(winOrLose){
            console.log(winOrLose)
            gameInfoUpdate(token, gameId)
                .then(response => response.json())
                .then(game => {

                    if (game.move !== null){
                        if (game.opponentMove !== null){
                            if (game.move === game.opponentMove) {
                                console.log("Draw")
                                setWinOrLose(false)
                                setShowWaitingForMove(false)
                                setShowDraw(true)
                                clearInterval(interval)

                            }
                            else if ((game.move === "ROCK" && game.opponentMove === "PAPER") || (game.move === "PAPER" && game.opponentMove === "SCISSORS") || (game.move === "SCISSORS" && game.opponentMove === "ROCK")) {
                                console.log("Lose!!")
                                setWinOrLose(false)
                                setShowWaitingForMove(false)
                                setShowLose(true)
                                clearInterval(interval)

                            }
                            else {
                                console.log("Win!!")
                                setWinOrLose(false)
                                setShowWaitingForMove(false)
                                setShowWin(true)
                                clearInterval(interval)

                            }
                        }
                    }else if (game.opponentName !== null) {
                        console.log("No name of oponent.. still ok right!?! ")
                    }
                })
        }

    }

    const startGame = () => {
        setShowMoves(true)
        setShowGames(false)
        setShowGameList(false)
        startGameFunction(token)
            .then(response => response.json())
            .then(player => {
                console.log(player.id)
                setGameId(player.id)
            })
    }

    const getPlayers = () => {
        setShowGameList(true)
        getAllGames()
            .then((allPlayers) => {
                setPlayers(allPlayers)

            })
    }

    return (
        <>
            {
                showSetName?<div>
                        <h1>Welcome to Extreme Harcore ROCK PAPER SCISSOR!</h1>
                        <h3>Pick a name to DESTROY your opponents with!!</h3>
                        <input
                            value={name}
                            onChange={event => setname(event.target.value)}
                        />
                    <br/>
                        <button
                            onClick={setAnonymousPlayer}>
                            DESTORY in the name of: {name.toUpperCase()}!
                        </button>
                    </div>
                    :null

            }
            {
                showGames?<div>
                    <button
                        onClick={getPlayers}>
                        Show OPPONENTS!
                    </button>
                    <button
                        onClick={startGame}>
                        Wait for OPPONENTS!
                    </button>
                </div>:null
            }
            {
                showGameList?<div>
                    <ul>
                        {players.map((player: {id: string, name: string}) => (
                            <Player
                                key={player.id}
                                id={player.id}
                                name={player.name}
                            ></Player>
                        ))
                        }
                    </ul>
                </div>:null
            }
            {
                showMoves?<div>
                    <button
                        onClick={makePlayerMoveScissor}>
                        Play SCISSOR
                    </button>
                    <button
                        onClick={makePlayerMovePaper}>
                        Play PAPPER
                    </button>
                    <button
                        onClick={makePlayerMoveStone}>
                        Play ROCK
                    </button>
                </div>:null
            }
            {
                showWaitingForMove?<div>
                    <h1>Waiting for your opponent...</h1>
                </div>:null
            }

            {
                showWin?<div>
                    <h1>You DESTROY the OPPONENT!</h1>
                    <button
                        onClick={newGame}>
                        Play AGAIN!
                    </button>
                </div>:null
            }

            {
                showLose?<div>
                    <h1>You got DESTROYED!</h1>
                    <button
                        onClick={newGame}>
                        Play AGAIN!
                    </button>
                </div>:null
            }
            {
                showDraw?<div>
                    <h1>A stalemate</h1>
                    <button
                        onClick={newGame}>
                        Play AGAIN!
                    </button>
                </div>:null
            }
        </>
    )

    interface IPlayer {
        id: string;
        name: string;
    }

    function Player({id, name}: IPlayer) {

        const joinGame = () => {
            setShowMoves(true)
            setShowGames(false)
            setShowGameList(false)
            joinGameFunction(token, id)
                .then(response => response.json())
                .then(player => {
                    console.log(player.id)
                    setGameId(player.id)
                })
        }

        return(
            <li>
                <button
                    onClick={joinGame}>
                    ATTACK! {name}
                </button>
            </li>
        )
    }

}

export default ThePageOfEverything





