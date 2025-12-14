
document.addEventListener('DOMContentLoaded', (event) => {
        
    const pathstats = window.location.pathname.split("/");
    const game_id = pathstats[2];
    const session_id = pathstats[3];

    const ms_gamescore = document.getElementById("card-GameScore");
    const ms_bestScore = document.getElementById("card-BestScore");
    const ms_time = document.getElementById("card-time");
    const ms_rating = document.getElementById("card-rating");
    const ms_maxSequence = document.getElementById("card-maxSeq");


    let rating;
    let game_score;
    let best_score;
    let total_time;
    let level_time;
    let best_time;
    let ratings = {
        'genius': 4,
        'impressive':3,
        'good':2,
        'bad':1, 
        'None': 0,
    }


    function receiveDataStats(){
        fetch(`/api/morestats/${session_id}`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                game_id:game_id,
                session_id:session_id
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('[FLASK] R:',data);
            if(data.status === "success"){
                rating = data.ms_rating;
                game_score = data.ms_gameScore;
                best_score = data.ms_bestScore;
                total_time = data.ms_totalTime;
                level_time = data.ms_levelTime;
                maxSequence = data.ms_maxSequence;
                ms_gamescore.textContent = game_score[game_score.length - 1];
                ms_bestScore.textContent = best_score[best_score.length - 1];
                ms_time.textContent = total_time[total_time.length -1];
                ms_rating.textContent = getBestRating(rating,ratings);
                ms_maxSequence.textContent = getBestSequence(maxSequence);


                //Am folosit chart.js ! NU AM HABAR CUM FUNCTIONEAZA , am urmarit un tutorial :)
                //Chart
                const gameScores = game_score.map(val=>parseInt(val)); // asiguram ca scorurile sunt int-uri
                
                //Etichete
                const gameLabels = Array.from({length:gameScores.length},(_, i)=> `Joc${i+1}`);
                new Chart(document.getElementById('scoreChart'),{
                    type: 'line',
                    data:{
                        labels: gameLabels,
                        datasets: [{
                            label: 'Scor Joc',
                            data: gameScores,
                            borderColor: 'rgb(75,192,192)',
                            tension: 0.1,
                            fill: false
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Varia scorului in timp',
                                color: 'white'
                            },
                            legend: {
                                labels:{
                                    color: 'white'
                                }
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                title:{
                                    display:true,
                                    text: 'Scor',
                                    color: 'white'
                                },
                                ticks: {
                                    color: 'white'
                                }
                            },
                            x: {
                                ticks: {
                                    color: 'white'
                                }
                            }
                        }
                    }
                });
            }
        })
        .catch((error)=>{
            console.error('[FETCH STATS] Error:',error);
        });
    }

    function getBestRating(ratingArray, ratingMap){
        let maxRatingScore = ratingMap['None']; 
        let bestRatingString = 'None';
        ratingArray.forEach(rate => {
            const cleanedRating = rate.trim().toLowerCase(); 
            const currentScore = ratingMap[cleanedRating] || 0; 
            if(currentScore > maxRatingScore){
                maxRatingScore = currentScore; 
                bestRatingString = cleanedRating;
            }
        });
        if (bestRatingString === 'None') {
             return 'None';
        }
        return bestRatingString.charAt(0).toUpperCase() + bestRatingString.slice(1);
    }
    function getBestSequence(maxSequence){
        let max = 0;

        maxSequence.forEach(i =>{
            let number = i;
            if(number > max){
                max = i;
            }
        });

        return max;

    }

    receiveDataStats();
});