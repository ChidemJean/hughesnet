import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    connect() {
        this.links = this.element.querySelectorAll(".scroll-links li");
        this.sections = document.querySelectorAll(".scroll-target");
        this.onScrollHandler = this.onScroll.bind(this);

        document.addEventListener('scroll', this.onScrollHandler);

        this.links?.forEach(link => {
            link.addEventListener('click', (e) => {
                this.scrollTo(e.target.getAttribute('data-url'));
            });
        });

    }
    scrollTo(_url) {
        let target = null;
        
        this.sections?.forEach((section, k) => {
            let url = section.getAttribute("data-url");
            if (url == _url) {
                target = section;
                return;
            }
        });

        if (target) {
            var doc = document.documentElement;
            var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
            //
            const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
            let boundingRect = target.getBoundingClientRect();
            let heightMenu = document.querySelector('header').getBoundingClientRect().height;
            if (supportsNativeSmoothScroll) {
                window.scrollTo({
                    top: (boundingRect.top + top) - heightMenu * 1.7,
                    left: 0,
                    behavior: 'smooth'
                });
            } else {
                window.scrollTo(0,(boundingRect.top + top) - heightMenu);
            }
        }
    }
    onScroll(e) {
        let scrollPosY = window.scrollY;
        let intersect = false;

        let heightMenu = document.querySelector('header').getBoundingClientRect().height;
        let rectCtn = this.element.getBoundingClientRect();
        let ulEl = this.element.querySelector('ul');
        if (rectCtn.top - heightMenu <= 0) {
            ulEl.classList.add('fixed', 'left-1/2', '-translate-x-1/2', 'w-full', 'z-20');
            ulEl.style.top = heightMenu + 'px';
            this.element.style.height = ulEl.getBoundingClientRect().height + 'px';
        } else {
            ulEl.classList.remove('fixed', 'left-1/2', '-translate-x-1/2', 'w-full', 'z-20');
            this.element.style.height = "auto";
        }

        this.sections?.forEach((section, k) => {
            let rect = section.getBoundingClientRect();
            let url = section.getAttribute("data-url");

            if (url && rect.top <= heightMenu * 1.7) {
                this.update(url);
                intersect = true;
                return;
            }
        });

        if (intersect) return;

        this.clean();
    }
    update(url) {
        this.links?.forEach(link => {
            let _url = link.getAttribute('data-url');
            let lineEl = link.querySelector('span');
            if (_url == url) {
                lineEl.classList.add('w-3/4');
            } else {
                lineEl.classList.remove('w-3/4');
            }
        });
    }
    clean() {
        this.links?.forEach(link => {
            link.querySelector('span').classList.remove('w-3/4');
        });
    }
}
