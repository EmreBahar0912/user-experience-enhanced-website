import express from 'express'

import { Liquid } from 'liquidjs';


console.log('Hieronder moet je waarschijnlijk nog wat veranderen')


const app = express()

app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))

const engine = new Liquid();
app.engine('liquid', engine.express()); 

app.set('views', './views')

app.get('/', async function (request, response) {
  const districts = ['algemeen', 'nieuw-west', 'oost', 'zuidoost']

  const fetches = districts.map(district => {
    const params = new URLSearchParams({
      'filter[district][_eq]': district,
      'filter[date][_nnull]': 'true', 
      'fields': 'id, title, date, cover.*, target_group, slug',
      'sort': '-date',
      'limit': 2
    })
    return fetch('https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?' + params)
      .then(res => res.json())
      .then(json => json.data)
  })

  const results = await Promise.all(fetches)

  const storiesByDistrict = {
    algemeen: results[0],
    'nieuw-west': results[1],
    oost: results[2],
    zuidoost: results[3]
  }

  const districtLabels = {
  algemeen: 'Algemeen',
  'nieuw-west': 'Nieuw-West',
  oost: 'Oost',
  zuidoost: 'Zuidoost'
}

   response.render('index.liquid', {storiesByDistrict, districtLabels})
})

app.get('/nieuw-west', async function (request, response) {

   const params = {
    'filter[district]': 'nieuw-west',
    'filter[date][_gte]': '2025-01-01',
    'filter[date][_lte]': '2025-12-31',
    'fields': 'title, intro, date, cover.id, slug'
  }

  const apiURL = 'https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?' + new URLSearchParams(params)

  const apiResponse = await fetch(apiURL)
  const apiResponseJSON = await apiResponse.json()

   response.render('nieuw-west.liquid', {stories: apiResponseJSON.data, page: 'nieuwwest'})
})

app.get('/oost', async function (request, response) {

   const params = {
    'filter[district]': 'oost',
    'filter[date][_gte]': '2025-01-01',
    'filter[date][_lte]': '2025-12-31',
    'fields': 'title, intro, date, cover.id, slug'
  }

  const apiURL = 'https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?' + new URLSearchParams(params)

  const apiResponse = await fetch(apiURL)
  const apiResponseJSON = await apiResponse.json()

   response.render('oost.liquid', {stories: apiResponseJSON.data, page: 'oost'})
})

app.get('/zuidoost', async function (request, response) {

   const params = {
    'filter[district]': 'zuidoost',
    'filter[date][_gte]': '2025-01-01',
    'filter[date][_lte]': '2025-12-31',
    'fields': 'title, intro, date, cover.id, slug'
  }

  const apiURL = 'https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?' + new URLSearchParams(params)

  const apiResponse = await fetch(apiURL)
  const apiResponseJSON = await apiResponse.json()

   response.render('zuidoost.liquid', {stories: apiResponseJSON.data, page: 'zuidoost'})
})

app.get('/zoeken', async function (request, response) {
  const search = request.query.search || ''

   const params = {
    'fields': 'title, intro, date, cover.id',
    ...(search && {'filter[title][_icontains]': search})
  }

  const apiURL = 'https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?' + new URLSearchParams(params)

  const apiResponse = await fetch(apiURL)
  const apiResponseJSON = await apiResponse.json()

   response.render('index.liquid', {stories: apiResponseJSON.data, search})
})

app.get('/zoeken', async function (request, response) {
  const search = request.query.search || ''

   const params = {
    'fields': 'title, intro, date, cover.id',
    ...(search && {'filter[title][_icontains]': search})
  }

  const apiURL = 'https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?' + new URLSearchParams(params)

  const apiResponse = await fetch(apiURL)
  const apiResponseJSON = await apiResponse.json()

   response.render('nieuw-west', {stories: apiResponseJSON.data, search})
})

app.get('/algemeen-nieuws-nieuw-oud', async function (request, response) {

   const params = {
    'filter[district]': 'algemeen',
    'fields': 'title, intro, date, cover.*',
    'sort': '-date'
  }

  const apiURL = 'https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?' + new URLSearchParams(params)

  const apiResponse = await fetch(apiURL)
  const apiResponseJSON = await apiResponse.json()

   response.render('index.liquid', {stories: apiResponseJSON.data})
})

app.get('/algemeen-nieuws-oud-nieuw', async function (request, response) {

   const params = {
    'filter[district]': 'algemeen',
    'fields': 'title, intro, date, cover.*',
    'sort': 'date'
  }

  const apiURL = 'https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?' + new URLSearchParams(params)

  const apiResponse = await fetch(apiURL)
  const apiResponseJSON = await apiResponse.json()

   response.render('index.liquid', {stories: apiResponseJSON.data})
})

app.get('/algemeen-doelgroep-wijkpartner', async function (request, response) {

   const params = {
    'filter[district]': 'algemeen',
    'filter[target_group]': 'wijkpartner',
    'fields': 'title, intro, date, cover.*, target_group',
    'sort': '-date'
  }

  const apiURL = 'https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?' + new URLSearchParams(params)

  const apiResponse = await fetch(apiURL)
  const apiResponseJSON = await apiResponse.json()

   response.render('index.liquid', {stories: apiResponseJSON.data})
})

app.get('/archief-2023', async function (request, response) {

   const params = {
    'filter[district][_in]': 'algemeen, nieuw-west, oost, zuidoost',
    'filter[date][_gte]': '2023-01-01',
    'filter[date][_lte]': '2023-12-31',
    'fields': 'title, intro, date, cover.id, slug, id'
  }

  const apiURL = 'https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?' + new URLSearchParams(params)
  console.log(apiURL)

  const apiResponse = await fetch(apiURL)
  const apiResponseJSON = await apiResponse.json()

  response.render('archief2023.liquid', {stories: apiResponseJSON.data})
})

app.get('/archief-2024', async function (request, response) {

   const params = {
    'filter[district][_in]': 'algemeen, nieuw-west, oost, zuidoost',
    'filter[date][_gte]': '2024-01-01',
    'filter[date][_lte]': '2024-12-31',
    'fields': 'title, intro, date, cover.id, slug, id'
  }

  const apiURL = 'https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?' + new URLSearchParams(params)
  console.log(apiURL)

  const apiResponse = await fetch(apiURL)
  const apiResponseJSON = await apiResponse.json()

   response.render('archief2024.liquid', {stories: apiResponseJSON.data})
})

app.get('/archief-zonder-datum', async function (request, response) {

   const params = {
    'filter[district][_in]': 'algemeen, nieuw-west, oost, zuidoost',
    'filter[date][_null]': 'true',
    'fields': 'title, intro, date, cover.id, slug, id'
  }

  const apiURL = 'https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?' + new URLSearchParams(params)
  console.log(apiURL)

  const apiResponse = await fetch(apiURL)
  const apiResponseJSON = await apiResponse.json()

   response.render('archiefzd.liquid', {stories: apiResponseJSON.data})
})

app.post('/collectie', async function (request, response) {

  const fetchRes = await fetch('https://fdnd-agency.directus.app/items/buurtcampuskrant_saved_stories', {

    method: 'POST',

    body: JSON.stringify({
      story: request.body.id,
      user: 1
    }),

    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })

  const fetchData = await fetchRes.json()

  if (fetchData.errors) {
        response.redirect('/collectie?error=true')
    } else {
        response.redirect('/collectie?success=true')
    }

})

app.get('/collectie', async function (request, response) {

  const savedRes = await fetch('https://fdnd-agency.directus.app/items/buurtcampuskrant_saved_stories?filter[user][_eq]=1&fields=id,story')
  const savedData = await savedRes.json()

  const ids = savedData.data.map(item => item.story).join(',')

  const storiesRes = await fetch(`https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?filter[id][_in]=${ids}&fields=id,title,date,cover.id`)
  const storiesData = await storiesRes.json()

    const stories = storiesData.data.map(story => {
        const saved = savedData.data.find(s => s.story === story.id)
        console.log('story.id:', story.id, 'saved:', saved)
        return { ...story, savedId: saved.id }
    })

  const success = request.query.success === 'true'
  const error = request.query.error === 'true'

  response.render('collectie.liquid', { stories: stories, success, error })
})

app.post('/collectie/verwijder', async function (request, response) {
    const savedId = request.body.savedId
    console.log('savedId:', savedId)

    const deleteRes = await fetch(`https://fdnd-agency.directus.app/items/buurtcampuskrant_saved_stories/${savedId}`, {
        method: 'DELETE'
    })
    console.log('delete status:', deleteRes.status)

    response.redirect('/collectie')
})

app.set('port', process.env.PORT || 8000)

app.get('/:slug', async function (request, response) {
   const slug = request.params.slug

   const params = {
    'filter[slug]': slug,
    'fields': 'title, intro, cover.id, body, target_group, slug'
  }

  const apiURL = 'https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?' + new URLSearchParams(params)

  const apiResponse = await fetch(apiURL)
  const apiResponseJSON = await apiResponse.json()

  const story = apiResponseJSON.data[0]

   response.render('detail.liquid', {story: story})
})

app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})