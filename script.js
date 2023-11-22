`use strict`;

function returnName(pattern) {
    return pattern.split('/')[2];
}

function geniratePage(category, arrayBooks) {

    // Set title
    document.getElementsByClassName('title_category')[0].textContent = category.toUpperCase();
    
    let newDiv = document.getElementById("list_book");
    
    // Set address and name books
    for (arrNA in arrayBooks) {
        // create Tag "li" 
        const creat_li = document.createElement('li');
        creat_li.id = "casper";

        // create Tag "a" 
        const creat_teg = document.createElement('a');
        creat_teg.setAttribute('href', "/" + arrayBooks[arrNA]);
        creat_teg.textContent = returnName(arrayBooks[arrNA]);

        creat_li.appendChild(creat_teg);
        newDiv.appendChild(creat_li);

    }

}

function whereUserCategoru() {
    let categorUs = window.location.href.split('/')[4];
    
    // console.log("User here: " + categorUs);
    
    return categorUs;
}

function jsonPars(json) {
    let flags = true;

    let count = 0;
    for (i in json) {

        for (item in json[i]) {

            let nameCategory = item;
            let arrayISjson = json[count++][item];

            if ((arrayISjson == null) == false) {

                if (whereUserCategoru() == nameCategory) {
                    geniratePage(nameCategory, arrayISjson);
                    flags = false;
                }
            }
        }
    }
    
	    if ((flags) && (whereUserCategoru() != undefined)) {
	document.getElementsByClassName('title_category')[0].textContent = whereUserCategoru().toUpperCase();

        const basediv = document.getElementsByClassName("text");     
        const default_text = document.createElement('p');

        default_text.id = "not_text";
        default_text.textContent = "На данный момент книги по данной теме отсутствуют.";
        
        basediv[0].appendChild(default_text);
    }
}

fetch('/metadata/data.json')
    .then((response) => response.json())
    .then((json) => jsonPars(json));
