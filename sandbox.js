// fetching data using The fetch API

// using async and await fetch

const NewGetTodos = async () => {

    const response = await fetch('Thejsons/A.json')

    if(response.status !== 200){
        throw new Error('cannot fetch the data')
    }

    const data = await response.json()

    response1 = await fetch('Thejsons/B.json')

    if(response1.status !== 200){
        throw new Error('cannot fetch the data')
    }

    data1 = await response1.json()

    response2 = await fetch('Thejsons/C.json')

    if(response2.status !== 200){
        throw new Error('cannot fetch the data')
    }

    data2 = await response2.json()

    const finaldata = [data,data1,data2]

    return finaldata

}
function MyFetch() {
    // using regular fetch API

    console.log('-----------------------using regular fetch API')

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
        console.log('-----------------------using async and await fetch')
        NewGetTodos()
        .then( data => console.log('resolved : ', data))
        .catch(err => console.log('rejected : ', err.message))
    }).catch(err => {
        console.log('rejected')
        console.log('-----------------------using async and await fetch')
        NewGetTodos()
        .then( data => console.log('resolved : ', data))
        .catch(err => console.log('rejected : ', err.message))
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