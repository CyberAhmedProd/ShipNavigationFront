import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LoginService } from '../../service/login/login.service';
import { BateauService } from '../../service/bateau/bateau.service';
import { AvisApareillageService } from '../../service/avisApareillage/avis-apareillage.service';
import { WeatherData } from '../../model/weatherData.model';
import { ForecastData } from '../../model/ForecastData.model';
import { WeatherServiceService } from '../../service/weatherService/weather-service.service';
import { ForecastDetails } from '../../model/ForecastDetails.model';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
    CountBateau : any;
    CountSortie : any;
    CountEntre : any;

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    listFilter;
    zip: number;
    showCurrent: boolean = false;
    showForecast: boolean = false;
    weatherDetails: WeatherData = new WeatherData();
    forecastData : ForecastData;
    basicData: any;
    basicOptions: any;

    constructor(private productService: ProductService, public layoutService: LayoutService,
        private loginService : LoginService, private bateauService: BateauService,private weatherService : WeatherServiceService,
        private avisService : AvisApareillageService) {
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
            this.initChart();
        });
    }
    ConvertCelcus(num : any)
    {
        return Math.floor(((Number(num) - 32) * 5/9) / 6);
    }
    ngOnInit() {
        this.zip = 5060
        this.weatherService.LoadForecastWeather(this.zip).subscribe(
            res => {
                     this.forecastData = new ForecastData();//Instance to store the Data of ForecastModel
                     this.forecastData.name = res.city.name;
                 for(var i=7; i<res.list.length;i=i+8)//Since we want for 5 days. it Jumps 8 times to get to next day.(A day had 8 details in API.)
                 {
                   //Instance of type ForecastDetails and stores the data in it.
                   var details = new ForecastDetails();
                       details.date = res.list[i].dt_txt;
                       details.maxTemperature = res.list[i].main.temp_max;
                       details.minTemperature = res.list[i].main.temp_min;
                       details.description = res.list[i].weather[0].description;
                       details.icon = res.list[i].weather[0].icon;
                       this.forecastData.details.push(details);//Pushing the data to the to created object

                 }
                 this.showCurrent = false;
                 this.showForecast = true;
            }
          )
        const idProp = Number(this.loginService.getDecodedAccessToken(localStorage.getItem("jwt_token")).Id)
        this.bateauService.ExecuteGetGetCountBateauByIdProprietaire(idProp).subscribe(x => {
            this.CountBateau = x.data;
        });
        this.avisService.ExecuteGetAllAvis().subscribe(myData => {
            let ListAvis = myData.data.filter(x => x.idProprietaire == idProp)
            console.log(ListAvis)
            let listLabel: string[] = [];
            let nbEquipage: any[] = [];
            ListAvis.forEach(element => {
                if(!listLabel.includes(element.nomBateau))
                    {
                        listLabel.push(element.nomBateau)
                        nbEquipage.push(element.equipages.length)
                    }

            });

            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
            this.basicData = {
                labels: listLabel,
                datasets: [
                    {
                        label: 'Equipage',
                        data: nbEquipage,
                        backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                        borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                        borderWidth: 1
                    }
                ]
            };

        })
        this.avisService.ExecuteCountAvis("NoTerminer",idProp).subscribe(x =>{
            this.CountSortie = x.data
        })
        this.avisService.ExecuteCountAvis("terminer",idProp).subscribe(x =>{
            this.CountEntre = x.data
        })
        this.initChart();
        this.productService.getProductsSmall().then(data => this.products = data);

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
