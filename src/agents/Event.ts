import axios from 'axios'
import {DrinkEvent} from "../types/server";

// page: page number to return
// pageSize: size of page (number of events per page)
// search: search query term (this is matched against the title of events and name of the location)

interface EventQuery {
    search?: string,
    pageSize?: number,
    page?: number
}

export const Event = {
    getEvents: (query?: EventQuery) =>
        axios.get<Array<DrinkEvent>>((
            () => {
                let url = `/events`
                if (!query || Object.values(query).length === 0) return url
                url += '?';
                Object.keys(query).map((
                    m, i
                    ) => {
                        const pairedValue = Object.values(query)[i]
                        if (pairedValue) {
                            url += `${i > 0 ? `&` : ``}${m}=${pairedValue}`
                        }
                    }
                )
                return url
            }
        )()),
    getSingleEvent: (eventId: string) => axios.get<DrinkEvent>(`/events/${eventId}`),
};




