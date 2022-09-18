// fetching data using The fetch API

function MyFetch(){
    fetch('Thejsons/A.json').then((response) => {
        console.log('resolved',response)
        return response.json()
    }).then(data => {
        console.log(data)
        return fetch('Thejsons/B.json')
    }).then((response) => {
        console.log('resolved',response)
        return response.json()
    }).then(data => {
        console.log(data)
        return fetch('Thejsons/C.json')
    }).then((response) => {
        console.log('resolved',response)
        return response.json()
    }).then(data => {
        console.log(data)
    }).catch(err => {
        console.log('rejected')
    })
}

// fetching data using XML manually
console.log("-----------------------fetching data using XML manually")

const getTodos = (resource) => {

    return new Promise((resolve,reject) => {
        const request = new XMLHttpRequest()

        request.addEventListener('readystatechange', () => {
            if(request.readyState===4&&request.status===200){
                const data = JSON.parse(request.responseText)
                resolve(data)
            }else if(request.readyState===4){
                const err = request.status
                reject(err)

            }

        })

        request.open('GET', resource )
        request.send()
    })
}

getTodos('Thejsons/A.json').then(data =>{
    console.log('promise 1 resolved : ',data)
    return getTodos('Thejsons/B.json')
}).then(data => {
    console.log('promise 2 resolved : ',data)
    return getTodos('Thejsons/C.json')
}).then(data => {
    console.log('promise 3 resolved : ',data)
    // fetching data using The fetch API
    console.log("-----------------------fetching data using The fetch API")
    MyFetch()
}).catch(err => {
    console.log('promise rejected : ', err)
    // fetching data using The fetch API
    console.log("-----------------------fetching data using The fetch API")
    MyFetch
})