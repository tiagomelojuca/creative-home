function toggleForm() {
    document.querySelector('#modal').classList.toggle('hide');
    document.querySelector('#modal').classList.toggle('addScroll');
    document.querySelector('body').classList.toggle('hideScroll');
}

function checkFields() {
    const valuesToCheck = [
        "title",
        "category",
        "image",
        "description",
        "url",
    ];

    const isEmpty = valuesToCheck.find(function(value) {
        if( typeof event.target[value].value === "string" && !event.target[value].value.trim() ) {
            return true;
        }
    });

    console.log(isEmpty);

    if(isEmpty) {
       event.preventDefault();
       alert('Please fill all fields below to proceed');
    }

}