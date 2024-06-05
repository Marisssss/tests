const modal = (options) => {
    const defaultOptions = {
    contentSelector: '',
    headerText: '', 
    modalId: '',
    btnToShowSelector: '',
    };
    const finalOptions = Object.assign(defaultOptions, options);

    const body = document.body;

    function removeOriginalContent() {
    document.querySelector(finalOptions.contentSelector).remove();
    }

    function getContent() {
        const content = document.querySelector(finalOptions.contentSelector);
        const modalIdTpl = '{{modalId}}';
        const modalHeaderTpl = '{(modalHeader}}';
        const modalContentTpl = '{{modalContent}}';
        const template = `
        <div class="modal" id='{{modalId}}'>
            <div class="modal_container">
                <div class="modal_body">
                    <div class="modal_header">{{modalHeader}}</div>
                    <div class="modal_close">
                        <a href="#"> 
                            $times; 
                        </a>
                    </div>
                    <div class="modal_content">
                        {{modalContent}}

                    <div class="modal_buttonbar">
                        <button class='buttonbar_ok'>OK</button>
                    </div>
                </div>
            </div>
        </div>
        `
        const htmlToElements = (html) => {
            const tpl = document.createElement('template');
            html = html.trim();
            tpl.innerHTML = html;
            return tpl.content.firstChild;
        } 
        const getModalContent = () => {
            const templated = template
                .replace(modalIdTpl, finalOptions.modalId)
                .replace(modalHeaderTpl, finalOptions.headertext)
                .replace(modalContentTpl, content.innerHTML);
            return htmlToElements (templated);
        }
    }
    return getModalContent();

    function initModal() {
        const modalElementContainer = getContent();
        removeOriginalContent();
        body.append(modalElementContainer);
        return modalElementContainer;
    }

    function initInteractions (modalElement) {
        const closeBtn = modalElement.querySelector('.modal_close a');
        const okBtn = modalElement.querySelector('.buttonbar_ok');
        const hide = (event) => {
            event && event.preventDefault(); 
            modalElement.classList.remove('visible'); 
            body.classList.remove('modal_visible')
        }
        const show = (event) => {
            event && event.preventDefault(); 
            modalElement.classList.add('visible'); 
            body.classList.add('modal_visible');
        }
        closeBtn.addEventListener('click', (event) => {
            hide(event);
        });
        okBtn.addEventListener('click', (event) => {
            hide(event);
        })
        body.addEventListener('keyup', (event) => {
            if (event.code === 'Escape') {
                hide(event);
            }
        });

        return {
            show, 
            hide
        }
    }

    function initShowBtn(showCallback) {
        const showBtn = document.querySelector(finalOptions.btnToShowSelector);
        
        showBtn.addEventListener('click', (event) => {
        event.preventDefault();
        showCallback();
        });
    }

    const modalElementContainer = initModal();
    const interactions = initInteractions (modalElementContainer);
    initShowBtn(interactions.show);

    return interactions;
}