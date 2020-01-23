let inputRub = document.getElementById('rub'),
    inputUsd = document.getElementById('usd');

inputRub.addEventListener('input', ()=>{

    function getCurs(){
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
    
            request.open('GET', 'js/current.json');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            request.send();
            
            request.addEventListener('readystatechange', function() {
                if (request.readyState === 4){
                    if(request.status == 200) {
                        let data = JSON.parse(request.response);
                        resolve(inputRub.value / data.usd);
                    } else {
                        reject("Что-то пошло не так!");
                    }
                }
            });
        });
    }

    getCurs()
        .then(cur => {
            inputUsd.value = cur;
        })
        .catch(miss=>{
            inputUsd.value = miss;
        })
});
