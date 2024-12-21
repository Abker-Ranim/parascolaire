import { AfterViewInit, Component } from '@angular/core';
import { Chart } from 'chart.js';
import * as echarts from 'echarts';

@Component({
  selector: 'app-dashboard-club',
  templateUrl: './dashboard-club.component.html',
  styleUrl: './dashboard-club.component.css',
})
export class DashboardClubComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    // Configuration du Pie Chart
    const pieChartDom = document.getElementById('pieChart')!;
    const pieChart = echarts.init(pieChartDom);
    const pieOption = {
      title: {
        text: 'classification by gender',
        // subtext: 'Fake Data',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      color: ['#fe87c8', '#95c2fa'],
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 60, name: 'Female' },
            { value: 40, name: 'Male' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
    pieChart.setOption(pieOption);

   
  }

  ngOnInit(): void {
    this.renderEventsChart();
  }

  renderEventsChart() {
    const ctx = document.getElementById('clubEventsChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          'Jan',
          'Fév',
          'Mar',
          'Avr',
          'Mai',
          'Juin',
          'Juil',
          'Août',
          'Sep',
          'Oct',
          'Nov',
          'Déc',
        ],
        datasets: [
          {
            label: "Nombre d'Événements de Club",
            data: [10, 20, 30, 25, 15, 40, 60, 55, 35, 45, 30, 50],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Évolution des Événements de Club par Mois',
          },
          legend: { display: true, position: 'bottom' },
        },
        scales: {
          x: { title: { display: true, text: 'Mois' } },
          y: {
            beginAtZero: true,
            title: { display: true, text: "Nombre d'Événements" },
          },
        },
      },
    });
  }


}
