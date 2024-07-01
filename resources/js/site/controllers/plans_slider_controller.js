import { Controller } from "@hotwired/stimulus"
import Swiper from 'swiper/bundle';

export default class extends Controller {
    connect() {
        const swiper = new Swiper(this.element.querySelector('.swiper'), {
            slidesPerView: 3,
            spaceBetween: 35,
            pagination: {
                clickable: true,
                el: this.element.querySelector('.swiper-pagination'),
            },
            breakpoints: {
                0: {
                    spaceBetween: 0,
                    slidesPerView: 1
                },
                390: {
                    spaceBetween: 8,
                    slidesPerView: 2
                },
                680: {
                    spaceBetween: 15,
                    slidesPerView: 2
                },
                820: {
                    spaceBetween: 25,
                    slidesPerView: 3
                },
                1000: {
                    spaceBetween: 35,
                    slidesPerView: 3
                }
            }
        });
    }
}
