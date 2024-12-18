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

    // Configuration du Bar Chart
    const barChartDom = document.getElementById('barChart')!;
    const barChart = echarts.init(barChartDom);
    const barOption = {
      title: {
        text: 'club classification by number of events',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: ['clubA', 'clubB', 'clubC', 'clubD'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          color: '#320285',
        },
      ],
    };
    barChart.setOption(barOption);
    
  
  }

  ngOnInit(): void {
    this.renderEventsChart();
    this.renderNewMembersChart();
    this.renderGenderSectorChart();
    this.renderMemberGrowthChart();
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

  renderNewMembersChart() {
    const ctx = document.getElementById('newMembersChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
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
            label: 'Nouveaux Membres',
            data: [15, 23, 30, 22, 28, 35, 40, 50, 45, 38, 25, 20],
            backgroundColor: '#4CAF50',
            borderColor: '#388E3C',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: 'Nouveaux Membres par Mois' },
          legend: { display: true },
        },
        scales: { y: { beginAtZero: true } },
      },
    });
  }

  renderGenderSectorChart() {
    const ctx = document.getElementById(
      'genderSectorChart'
    ) as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Informatique',
          'Finance',
          'Santé',
          'Éducation',
          'Sport',
          'Arts',
        ],
        datasets: [
          {
            label: 'Hommes',
            data: [20, 30, 25, 35, 15, 18],
            backgroundColor: '#1E88E5',
          },
          {
            label: 'Femmes',
            data: [25, 20, 30, 40, 20, 25],
            backgroundColor: '#E91E63',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Répartition des sexes par Secteur d'Activité",
          },
          legend: { display: true, position: 'top' },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Nombre de Membres' },
          },
        },
      },
    });
  }
  renderMemberGrowthChart() {
    const ctx = document.getElementById('memberGrowthChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line', // Type du graphique (ici un graphique linéaire)
      data: {
        labels: [
          'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'
        ], // Mois de l'année
        datasets: [
          {
            label: "Membres entrants",
            data: [15, 23, 30, 22, 28, 35, 40, 50, 45, 38, 25, 20], // Données sur les nouveaux membres entrants chaque mois
            borderColor: 'rgba(54, 162, 235, 1)', // Couleur de la ligne
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Couleur de fond sous la ligne
            tension: 0.4, // Courbure de la ligne
            fill: true, // Remplir sous la courbe
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Évolution des Membres Entrants par Mois', // Titre du graphique
          },
          legend: {
            display: true,
            position: 'bottom', // Position de la légende
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Mois', // Titre pour l'axe X
            },
          },
          y: {
            beginAtZero: true, // Commence à zéro sur l'axe Y
            title: {
              display: true,
              text: "Nombre de Membres", // Titre pour l'axe Y
            },
          },
        },
      },
    });
  }
}
