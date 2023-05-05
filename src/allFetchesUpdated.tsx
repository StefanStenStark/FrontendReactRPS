
export const fetchNewToken = () =>
    fetch("http://localhost:8080/rock-paper-scissors/auth/token")
.then((response) => response.json());

export const setNameFunction = (token: string, name: string) =>
    fetch("http://localhost:8080/rock-paper-scissors/user/name", {
        method: "POST",
        headers: {
            token: token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name: name})
    })

//Fetch som hämtar alla spelare.
export const getAllGames = () =>
    fetch("http://localhost:8080/rock-paper-scissors/games", {
        method: "GET"
    })
        .then(response => response.json())

export const startGameFunction = (token: string) =>
    fetch("http://localhost:8080/rock-paper-scissors/games/start", {
        method: "POST",
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    })


export const joinGameFunction = (token: string, gameId: string) =>
    fetch("http://localhost:8080/rock-paper-scissors/games/join/" + gameId, {
        method: "GET",
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    })


export const makeMoveFunction = (token: string, playerMove: string) =>
    fetch("http://localhost:8080/rock-paper-scissors/games/move/" + playerMove, {
        method: "POST",
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    })


export const gameInfoUpdate = (token: string, gameId: string) =>
    fetch("http://localhost:8080/rock-paper-scissors/games/" + gameId,
        {
            method: 'GET',
            headers: {
                token: token,
                "Content-Type": "application/json"
            },
        })




/*

@GetMapping("/games/join/{gameId}")
    public GameStatusDTO joinGame(@PathVariable UUID gameId,@RequestHeader Map<String, String> headers) {//method that returns game and takes UUID. basically
        String playerTwoId = headers.get("token");
        GameStatusDTO game = gameService.joinGame(gameId,UUID.fromString(playerTwoId));
        return game;
    }

}*/
