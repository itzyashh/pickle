import { io } from 'socket.io-client'
import LocalHost from '../api/LocalHost'

const SOCKET_URL = LocalHost.defaults.baseURL

class WSService {
    initiliazeSocket = async () => {
    try {
        this.socket = io (SOCKET_URL, {
            transports: ['websocket'],
            jsonp: false
        })

        this.socket.on('connect', () => {
            console.log('connected')
        })
        this.socket.on('disconnect', () => {
            console.log('disconnected')
        })

        this.socket.on('error', (error) => {
            console.log('error', error)
        })


    } catch (error) {
        console.log('error', error)
    }
}

on = (event, callback) => {
    this.socket.on(event, callback)
}


emit = (event, data) => {
    this.socket.emit(event, data)
}
emitWithAck = (event, data, ack) => {
    this.socket.emit(event, data, ack)
}

removeListener = (event, fn) => {
    this.socket.off(event, fn)
}

}

export default new WSService()