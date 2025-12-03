from flask import Flask,render_template,redirect,request

app = Flask(__name__)

games = {
    "corsiblock": {
        "name": "Corsi Block Test",
        "gameDesc": "Repeat the sequence",
        "description": "Remember the sequence of blocks."
    },
    "aimtrainer": {
        "name": "Aim Trainer Test",
        "gameDesc": "Hit as many green circles as you can , avoid red ones.",
        "description": "Hit all the green targets , avoid the red ones."
    },
    "reactiontime": {
        "name": "Reaction Time Test",
        "gameDesc": "React as fast as you can",
        "description": "Press the game window as fast as you can when it turns GREEN"
    },
    "matchtwo": {
        "name": "Match Two Test",
        "gameDesc": "Find And Match two identical tiles.",
        "description": "Press the game window as fast as you can when it turns GREEN"
    }
}

@app.route("/")
def homePage():
    return render_template("main.html")


@app.route("/games")
def gamesPage():
    return render_template("games.html")



# @app.route("/game/<string:id>",methods=["GET","POST"])
@app.route("/game/<game_id>")
def gamePage(game_id):
    game = games.get(game_id)
    if game is None:
        return render_template("games.html")
    return render_template("game.html",game=game,game_id=game_id)

if __name__ == "__main__":
    app.run(debug=True)