function FormModal(form = 'form') {
    var _this = this;
    this.targetName = form;
    this.targetElement = document.querySelector(this.targetName);
    if (this.targetElement) {
        this.isActive = this.targetElement.hasAttribute('form-modal') ? this.targetElement.getAttribute('form-modal') : 'true';
        this.isTriggered = this.targetElement.hasAttribute('form-modal-trigger') ? this.targetElement.getAttribute('form-modal-trigger') : 'false';
        this.title = this.targetElement.hasAttribute('form-title') ? this.targetElement.getAttribute('form-title') : 'Default Title';
        this.titleSuccess = this.targetElement.hasAttribute('form-title-success') ? this.targetElement.getAttribute('form-title-success') : 'Default Title Success';
        this.titleError = this.targetElement.hasAttribute('form-title-error') ? this.targetElement.getAttribute('form-title-error') : 'Default Title Error';
        this.role = this.targetElement.hasAttribute('form-Modal-Role') ? this.targetElement.getAttribute('form-Modal-Role') : 'Confirmation';
        this.confirmButton = null;
        this.isSuccess = false;
        this.isError = false;
        this.isResponse = {};
        this.modalData = [];
    }

    this.mount = () => {
        if (this.isActive === 'true') {
            initialize();
            watchChanges();
        }
    }
    /**
     * Setter
     */
    /**
     * getter
     */
    getResponse = () => {
        return this.isResponse;
    }
    getTargetElement = () => {
        return this.targetElement;
    }
    getIsTriggered = () => {
        return this.isTriggered;
    }
    getIsSuccess = () => {
        return this.isSuccess;
    }
    getIsError = () => {
        return this.isError;
    }
    /**
     * end of getter
     */
    initialize = () => {
        // register input field
        let _el = this.targetElement;
        for (let i = 0; i < _el.length; i++) {
            let element = _el.elements[i];
            if (element.tagName === 'BUTTON' && element.type == 'submit') {
                // add event to confirmButton to open modal
                element.addEventListener('click', (e) => {
                    e.preventDefault();
                    // check if function exist
                    if (typeof displayConfirmModal == 'function') {
                        displayConfirmModal();
                    }
                });
                _this.confirmButton = element;
            } else if (element.tagName === 'INPUT' && element.type == 'hidden') {
                continue;
            } else {
                let searchLabel = element.labels != null ? cleanString(document.querySelector(`label[for=${element.id}]`).textContent) : '';
                _this.modalData.push({
                    element: element,
                    id: element.id,
                    tag: element.tagName,
                    type: element.type,
                    label: searchLabel
                });
            }
        }
    }
    displayConfirmModal = () => {
        let modalContainer = document.createElement('div'),
            modalOverlay = document.createElement('div'),
            modalTitle = document.createElement('p'),
            modalContent = document.createElement('div'),
            modalIcon = document.createElement('div'),
            modalDataList = document.createElement('ul'),
            modalButtonArea = document.createElement('div');
        // add class to the generated modal
        modalContainer.className = 'p-modal p-modal--active';
        modalOverlay.className = 'p-modal__background';
        modalContent.className = 'p-modal__contents';
        modalTitle.className = 'p-modal__title';
        modalIcon.className = 'p-modal__check';
        modalDataList.className = 'p-modal__list';
        modalButtonArea.className = 'p-modal__buttonArea';
        // add event to background to close/delete modal
        modalOverlay.addEventListener('click', (e) => {
            closeModal(modalContainer, true);
        });
        // append children to parent
        modalContainer.append(modalOverlay);
        modalContainer.append(modalContent);
        modalContent.append(modalTitle);
        if (getIsSuccess()) {
            // set title
            modalTitle.innerText = this.titleSuccess;
            modalIcon.innerHTML += '<i class="s s-5x s-icon_success"></i>'
            modalContent.append(modalIcon);
        } else if (getIsError()) {
            // set title
            modalTitle.innerText = this.titleError;
            modalIcon.innerHTML += '<i class="s s-5x s-icon_error"></i>'
            modalContent.append(modalIcon);
        } else {
            // set title
            modalTitle.innerText = this.title;
            modalDataList.innerHTML = insertInputData();
            modalContent.append(modalDataList);
        }
        // prepare buttons
        preparedModalButtons(modalContainer, modalButtonArea);
        modalContent.appendChild(modalButtonArea);
        // inject modal to body tag
        document.body.appendChild(modalContainer);
    }
    insertInputData = () => {
        let html = '';
        let _el = this.modalData;
        for (let i = 0; i < _el.length; i++) {
            let v = _el[i].element.value;
            let l = cleanString(_el[i].label);
            if (v) {
                html += `<li class=p-modal__list__item><span class=label id=label_${_el[i].id}> ${l} </span><p class=data id=data_${_el[i].id}> ${v} </p></li>`;
            }
        }
        return html;
    }

    preparedModalButtons = (modalContainer, buttonArea) => {
        let buttonCancel = document.createElement('button');
        let buttonSubmit = document.createElement('button');
        let buttonReturn = document.createElement('button');
        buttonCancel.className = 'p-modal__button p-modal__button--l p-modal__button--main p-modal__button--cancel';
        buttonSubmit.className = 'p-modal__button p-modal__button--l p-modal__button--accent p-modal__button--submit';
        buttonReturn.className = 'p-modal__button p-modal__button--l p-modal__button--accent p-modal__button--return';
        buttonCancel.innerText = 'Cancel';
        buttonSubmit.innerText = 'Submit';
        buttonReturn.innerText = 'Return';
        //event
        buttonCancel.addEventListener('click', function (e) {
            e.preventDefault;
            closeModal(modalContainer, true);
        });
        buttonReturn.addEventListener('click', function (e) {
            e.preventDefault;
            closeModal(modalContainer, true);
        });
        buttonSubmit.addEventListener('click', function (e) {
            e.preventDefault();
            let _form = $(getTargetElement());
            let _formData = new FormData(_form[0]);
            let _loader = document.createElement('div');
            _loader.className = 'c-loader';
            $.ajax({
                type: _form.attr('method'),
                url: _form.attr('action'),
                processData: false,
                contentType: false,
                data: _formData,
                beforeSend: function () {
                    document.querySelector('.p-modal--active .p-modal__contents').appendChild(_loader);
                },
                success: function (response) {
                    let parsedResponse;
                    try {
                        parsedResponse = JSON.parse(response);
                    } catch (e) {
                        parsedResponse = response;
                    }
                    _this.isResponse = parsedResponse;
                    _this.isTriggered = "true";
                    _this.targetElement.setAttribute('form-modal-trigger', getIsTriggered());
                    getTargetElement().reset(); // remove form input data
                },
                error: function ($xhr, XMLHttpRequest, textStatus, errorThrown) {
                    var string = $xhr.responseJSON;
                    _this.isResponse = string;
                    _this.isTriggered = "true";
                    _this.targetElement.setAttribute('form-modal-trigger', getIsTriggered());
                },
                complete: function () {
                    _loader.remove();
                },
            });
        });
        if (getIsSuccess() || getIsError()) {
            buttonArea.appendChild(buttonReturn);
        } else {
            buttonArea.appendChild(buttonCancel);
            buttonArea.appendChild(buttonSubmit);
        }
    }
    watchChanges = () => {
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type === "attributes") {
                    // if form is submitted
                    if ('success' in getResponse()) {
                        _this.isSuccess = true;
                        _this.isError = false;
                    } else if ('error' in getResponse()) {
                        _this.isSuccess = false;
                        _this.isError = true;
                    } else {
                        _this.isSuccess = false;
                        _this.isError = false;
                    }
                    // remove old modal
                    closeModal(document.querySelector('.p-modal'));
                    // generate new modal
                    displayConfirmModal();
                }
            });
        });
        observer.observe(this.targetElement, {
            attributes: true,
            // attributeFilter: ['id', 'class'], // filter you don't want to watch
        });
    }
    /**
     * function
     */
    const closeModal = (x, reset = false) => {
        if (reset) {
            // reset isSuccess and isError
            resetData();
        }
        return x.remove();
    }
    const resetData = () => {
        _this.isSuccess = false;
        _this.isError = false;
    }
    const cleanString = (x) => {
        return x.replace(/[^\w ]/g, '');
    }
}