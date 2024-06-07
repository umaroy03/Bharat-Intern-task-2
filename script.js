document.addEventListener('DOMContentLoaded', async function () {
    const statisticsChartData = await fetchChartData('/api/transactions') || getDemoStatisticsData();
    const expenseChartData = await fetchChartData('/api/expenses') || getDemoExpenseData();

    const ctxStatistics = document.getElementById('statisticsChart').getContext('2d');
    const statisticsChart = new Chart(ctxStatistics, {
        type: 'line',
        data: {
            labels: statisticsChartData.labels,
            datasets: [{
                label: 'Statistics',
                data: statisticsChartData.data,
                borderColor: 'rgba(46, 204, 113, 1)',
                backgroundColor: 'rgba(46, 204, 113, 0.3)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white',
                        font: {
                            size: 16
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: 'white',
                        font: {
                            size: 14
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                },
                y: {
                    ticks: {
                        color: 'white',
                        font: {
                            size: 14
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                }
            }
        }
    });

    const ctxExpense = document.getElementById('expenseChart').getContext('2d');
    const expenseChart = new Chart(ctxExpense, {
        type: 'pie',
        data: {
            labels: expenseChartData.labels,
            datasets: [{
                label: 'All Expense',
                data: expenseChartData.data,
                backgroundColor: [
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(52, 152, 219, 0.7)',
                    'rgba(241, 196, 15, 0.7)'
                ],
                borderColor: [
                    'rgba(231, 76, 60, 1)',
                    'rgba(52, 152, 219, 1)',
                    'rgba(241, 196, 15, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            animation: {
                duration: 1500,
                easing: 'easeInOutCubic'
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white',
                        font: {
                            size: 16
                        }
                    }
                }
            },
            responsive: true
        }
    });
});

async function fetchChartData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.length === 0) return null;
        const labels = data.map(item => item.date || item.category);
        const amounts = data.map(item => item.amount || item.value);
        return { labels, data: amounts };
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

function getDemoStatisticsData() {
    return {
        labels: ['Nov 21', 'Nov 22', 'Nov 23', 'Nov 24', 'Nov 25', 'Nov 26'],
        data: [3000, 2900, 3200, 3500, 3300, 3600]
    };
}

function getDemoExpenseData() {
    return {
        labels: ['Payment', 'Transfer', 'Balance'],
        data: [300, 200, 100]
    };
}
