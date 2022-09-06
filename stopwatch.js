export const start = async ( callback = _ => {}, timestamp_url = `${location.origin}/time` ) => { // assignments here are the default values for parameters
    let timestamp // declare timestamp variable to avoid scoping issues

    const time = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    }    

    try { // catch errors for the fetch function
        timestamp = Number(await fetch(timestamp_url).then( d => d.text() ))// fetches time from server as a string, then converts the string to a number
    } catch ( error ) {
        console.error( error )
    }

    setInterval(( ) => { // execute code once every second

        // time math

        let delta = new Date(Date.now() - timestamp) / 1000
        const days = Math.floor(delta / 86400)
        delta -= days * 86400
        const hours = Math.floor(delta / 3600) % 24
        delta -= hours * 3600
        const minutes = Math.floor(delta / 60) % 60
        delta -= minutes * 60
        const seconds = Math.floor(delta % 60)

        Object.assign(time, { // quick way to assign properties to the time object
            days: String(days).padStart(2, '0'), 
            hours: String(hours).padStart(2, '0'), 
            minutes: String(minutes).padStart(2, '0'), 
            seconds: String(seconds).padStart(2, '0')
        }) 

        callback( time ) // execute the callback function every second and pass the time object as a parameter
    }, 1000)
}

export const reset = async ( reset_url = `${location.origin}/reset` ) => {
    try {
        await fetch(reset_url) // make a get request to the reset url
        location.reload() // reload the page
    } catch ( error ) {
        console.error( error )
    }
}