function FileUpload(selector = '.c-file01', ) {
    var _this = this;
    this.targetSelector = document.querySelector(selector);
    this.fileUpload = this.targetSelector.querySelector('input[type="file"]');
    this.fileUploadIndicator = this.targetSelector.querySelector('.c-file01__indicator');
    this.watch = () => {
        let fileUpload = this.fileUpload;
        if (fileUpload) {
            fileUpload.addEventListener('change', (e) => {
                let fileName = fileUpload.files[0].name !== undefined ? fileUpload.files[0].name : 'No file chosen...';
                _this.fileUploadIndicator.innerText = fileName;
            });
        }
    }
}