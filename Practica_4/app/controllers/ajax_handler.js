"use strict";

async function loadProducts(url){   
    let response = await fetch(url);
    if (response.status != 200) return [];
    let products = await response.json();
    return products;
}


function postCart(url, proxy, onSuccess, onError) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(proxy));
    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
}


function getXhrResponse(xhr, onSuccess, onError) {
    if (xhr.status == 200) {
        onSuccess(xhr.responseText);
    } else {
        onError(xhr.status + ': ' + xhr.statusText);
    }
}