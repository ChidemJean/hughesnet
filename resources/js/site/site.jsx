import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../bootstrap';
import '../../css/app.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'flowbite';

import { Application } from "@hotwired/stimulus"
import { registerControllers } from 'stimulus-vite-helpers'

const application = Application.start();
const controllers = import.meta.globEager('./**/*_controller.js');
registerControllers(application, controllers);
