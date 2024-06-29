import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = [ "bg", "content" ]

    connect() {
        this.isOpen = false;
        this.toggleBtns = document.querySelectorAll('.toggle-menu-mobile');
        this.onToggleClickHandler = this.onToggleClick.bind(this);
        this.toggleBtns?.forEach(toggleBtn => toggleBtn.addEventListener('click', this.onToggleClickHandler));

        this.transitionsAttrs = {};
        this.transitionsAttrsNames = this.contentTarget.getAttributeNames().filter((v, i, list) => (v.indexOf('data-transition') !== -1));
        this.transitionsAttrsNames?.forEach(attr => {
            this.transitionsAttrs = {
                ...this.transitionsAttrs,
                [attr]: this.contentTarget.getAttribute(attr).split(' ')
            };
        });

        let closeHandler = this.close.bind(this);

        document.addEventListener('keyup', this.onGlobalKeyUp.bind(this));
        document.querySelectorAll('.menu-mob a')?.forEach(a => {
            a.addEventListener('click', function (e) {
                closeHandler();
            });
        });
    }
    onGlobalKeyUp(e) {
        if (e.keyCode == 27 && this.isOpen) {
            this.close();
        }
    }
    getCurrentTransitionDuration() {
        let duration = [...this.contentTarget.classList].reduce((prev, cur, curIdx, list) => {
            return cur.indexOf('duration-') !== -1 ? cur : prev;
        });
        return duration ? Number(duration.split('-')[1]) : 0;
    }
    onToggleClick(e) {
        if (this.isOpen) {
            this.close();
            return;
        }
        this.open();
    }
    open() {
        this.isOpen = true;
        document.querySelector('body').style.overflowY = "hidden";
        let content = this.contentTarget;

        this.element.classList.remove('hidden');
        let enterStartAddClasses = [...this.transitionsAttrs['data-transition:enter'], ...this.transitionsAttrs['data-transition:enter-start']];
        let enterEndAddClasses = [...this.transitionsAttrs['data-transition:enter-end']];
        content.classList.add(...enterStartAddClasses);

        let duration = this.getCurrentTransitionDuration();
        setTimeout(() => {
            content.classList.add(...enterEndAddClasses);
            setTimeout(() => {
                content.classList.remove(...[...enterEndAddClasses, ...enterStartAddClasses]);
            }, duration);
        }, 100);
    }
    close() {
        this.isOpen = false;
        document.querySelector('body').style.overflowY = "scroll";

        let element = this.element;
        let content = this.contentTarget;
        let leaveStartAddClasses = [...this.transitionsAttrs['data-transition:leave'], ...this.transitionsAttrs['data-transition:leave-start']];
        let leaveEndAddClasses = [...this.transitionsAttrs['data-transition:leave-end']];
        content.classList.add(...leaveStartAddClasses);

        let duration = this.getCurrentTransitionDuration();
        setTimeout(() => {
            content.classList.add(...leaveEndAddClasses);
            setTimeout(() => {
                content.classList.remove(...[...leaveEndAddClasses, ...leaveStartAddClasses]);
                element.classList.add('hidden');
            }, duration);
        }, 100);
    }
}
