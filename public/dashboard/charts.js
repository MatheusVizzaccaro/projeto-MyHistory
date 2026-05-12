div_username.innerHTML = `${sessionStorage.USER_USERNAME}, este foi o resultado do questionário do jogo.`;

const ctx = document.getElementById('grafico1');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Questão 1', 'Questão 2', 'Questão 3', 'Questão 4', 'Questão 5'],
        datasets: [{
            label: 'Demonstra quanto tempo foi dedicado por questão',
            data: [7, 8, 5, 10, 6],
            borderColor: 'white',
            borderWidth: 2,
            pointRadius: 4,
            tension: 0.3
        }]
    },
    options: {
        plugins: {
            title: { display: true, text: 'Tempo de resposta por questão' }
        },
        scales: {
            y: {
                ticks: {
                    callback: (value) => value.toFixed(1) + 's'
                }
            }
        }
    }
});

const ctx2 = document.getElementById('grafico2');

new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['Questão 1', 'Questão 2', 'Questão 3', 'Questão 4', 'Questão 5'],
        datasets: [{
            label: '',
            data: [1, 2, 3, 2, 1],
            backgroundColor: [
                '#2e7d32', '#c9a800', '#c62828', '#c9a800', '#2e7d32'
            ],
            borderRadius: 4
        }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Nível de dificuldade por questão'
            },
            legend: {
                display: false
            }
        },
        scales: {
            y: {    
                ticks: {
                    stepSize: 1,
                    callback: function(value) {
                        let labels = { 1: 'Fácil', 2: 'Médio', 3: 'Difícil' };
                        return labels[value];
                    }
                }
            }
        }
    }
});