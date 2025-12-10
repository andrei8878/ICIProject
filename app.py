from flask import Flask,render_template,redirect,request,jsonify,session
from datetime import timedelta
import os
import uuid # custom id, folosim asta pt id-u sesiunii

app = Flask(__name__)
app.secret_key = "gagadfadf"
#Pastreaza cookie-urile pentru maxim 2 ore.
app.permanent_session_lifetime = timedelta(hours=2)




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
        "description": "Find and match two identical match to win the game."
    }
}

@app.route("/")
def homePage():
    session.permanent = True
    return render_template("main.html")


@app.route("/games")
def gamesPage():
    return render_template("games.html")



# @app.route("/game/<string:id>",methods=["GET","POST"])
@app.route("/game/<game_id>", methods=['POST','GET'])
def gamePage(game_id):
    game = games.get(game_id)
    # data = request.get_json()
    best_score = 0
    if 'best_scores' in session:
        best_score = session['best_scores'].get(game_id,0)
    if game is None:
        return render_template("games.html")
    return render_template("game.html",game=game,game_id=game_id,best_score=best_score)


@app.route("/api/save",methods=['POST']) ## Folosim doar POST pentru ca dorim sa modificam doar anumite date
def save_userData():
    data = request.get_json()
    game_id = data.get('game_id')
    best_score = data.get('best_score')
    game_score = data.get('game_score')
    playerseqTime = data.get('playerSeqtime')
    timestr = data.get('timestr')


    #Verificam daca datele exista
    if (game_id or best_score or game_score or playerseqTime) is None:
        return jsonify({'status':'rejected','message':'Invalid data'})

    if 'session_id' not in session:
        session['session_id'] = str(uuid.uuid4())
    if 'best_scores' not in session:
        session['best_scores'] = {} #facem un nou dictionar pt best_scores
    
    # session['best_scores'].get(parm1,parm2) , parm1 ,daca exista, ne va da game_id , parm2 este un parametru default in caz ca nu exista game_id
    current_best = session['best_scores'].get(game_id,0)
    update = False

    if game_id:
        if current_best < game_score:
            current_best = game_score
            update = True
        updateUserDataCSV(game_id,current_best,game_score,timestr,playerseqTime)
    
    if update:
        session['best_scores'][game_id] = game_score
        session.modified = True # !!! trebuie sa anuntam Flask pentru noua modificare
        return jsonify({'status':'newbest','best_score':current_best})
    
    return jsonify({'status':'same','best_score':current_best})


@app.route("/api/reset",methods=['POST'])
def resetuserData():
    data = request.get_json()
    game_id = data.get('game_id')
    
    if not game_id :
        return jsonify({'status':'rejected','message':'Invalid data'})
    if 'best_scores' not in session:
        session['best_scores'] = {}
    
    session['best_scores'][game_id] = 0
    best_score = session['best_scores'].get(game_id,0)
    session.modified = True
    return jsonify({'status':'success','best_score':best_score})



def updateUserDataCSV(game_id, current_best,game_score,totaltime,time):
    session_id = session['session_id']
    widths = {
        "Session ID":40,
        "Game ID":15,
        "Rating":10,
        "Game Score":12,
        "Best Score": 12,
        "Total Time": 15,
        "Level Time":100
    }
    data = {
        "Session ID":session_id,
        "Game ID":game_id,
        "Rating":rating(game_id,game_score),
        "Game Score":game_score,
        "Best Score":current_best,
        "Total Time": totaltime,
        "Level Time": time
    }
    fieldnames = ["Session ID","Game ID","Rating","Game Score","Best Score","Total Time","Level Time"]
    file = os.path.isfile("userdata.csv")
    with open("userdata.csv",mode="a",newline="",encoding="utf-8") as csvfile:
        if not file:
            fieldnamesdict = {f: f for f in fieldnames }
            csvfile.write(formatCSV(fieldnamesdict,fieldnames,widths))
        csvfile.write(formatCSV(data,fieldnames,widths))

def formatCSV(fieldnamedict,fieldnames,widths):
    line = "| "
    for fieldname in fieldnames:
        val = str(fieldnamedict.get(fieldname,"")).ljust(widths[fieldname])
        line += val + " | "
    return line + "\n"


def rating(game_id,game_score):
    if game_id == "corsiblock":
        if game_score >= 1:
            return "mediocre"
    elif game_id == "matchtwo":
        if game_score >= 30000:
            return "genius"
    
if __name__ == "__main__":
    app.run(debug=True)