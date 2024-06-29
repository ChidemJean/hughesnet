import { Controller } from "@hotwired/stimulus"
import Swiper from 'swiper/bundle';

export default class extends Controller {
    connect() {
        const swiper = new Swiper(this.element.querySelector('.swiper'), {
            pagination: {
                clickable: true,
                el: this.element.querySelector('.swiper-pagination'),
            },
            autoplay: {
                delay: 10000,
            },
        });
    }
}
