// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';


console.log('Hieronder moet je waarschijnlijk nog wat veranderen')
// Doe een fetch naar de data die je nodig hebt
// const apiResponse = await fetch('...')

// Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
// const apiResponseJSON = await apiResponse.json()

// Controleer eventueel de data in je console
// (Let op: dit is _niet_ de console van je browser, maar van NodeJS, in je terminal)
// console.log(apiResponseJSON)


// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({extended: true}))

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express()); 

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')

// Maak een GET route voor de index (meestal doe je dit in de root, als /)
app.get('/', async function (request, response) {
   // Render index.liquid uit de Views map
   // Geef hier eventueel data aan mee
   const params = {
    'filter[district]': 'algemeen',
    'fields': 'id, title, intro, date,cover.*, target_group'
  }

  const apiURL = 'https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?' + new URLSearchParams(params)
  // console.log(apiURL)
  // console.log('API URL:', apiURL)

  const apiResponse = await fetch(apiURL)
  const apiResponseJSON = await apiResponse.json()
  // console.log('Alle stories:', apiResponseJSON.data.map(s => ({ id: s.id, target_group: s.target_group })))

  // console.log('Eerste story:', apiResponseJSON.data[0])
  // console.log(personResponseJSON.data)
   response.render('index.liquid', {stories: apiResponseJSON.data})
})

app.get('/nieuw-west', async function (request, response) {
   // Render index.liquid uit de Views map
   // Geef hier eventueel data aan mee
   const params = {
    'filter[district]': 'nieuw-west',
    'fields': 'title, intro, date, cover.id'
  }

  const apiURL = 'https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?' + new URLSearchParams(params)
  // console.log(apiURL)

  const apiResponse = await fetch(apiURL)
  const apiResponseJSON = await apiResponse.json()
  // console.log(personResponseJSON.data)
   response.render('nieuw-west.liquid', {stories: apiResponseJSON.data, page: 'nieuwwest'})
})

app.get('/oost', async function (request, response) {
   // Render index.liquid uit de Views map
   // Geef hier eventueel data aan mee
   const params = {
    'filter[district]': 'oost',
    'fields': 'title, intro, date, cover.id'
  }

  const apiURL = 'https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?' + new URLSearchParams(params)
  // console.log(apiURL)

  const apiResponse = await fetch(apiURL)
  const apiResponseJSON = await apiResponse.json()
  // console.log(personResponseJSON.data)
   response.render('oost.liquid', {stories: apiResponseJSON.data, page: 'oost'})
})

app.get('/zuidoost', async function (request, response) {
   // Render index.liquid uit de Views map
   // Geef hier eventueel data aan mee
   const params = {
    'filter[district]': 'zuidoost',
    'fields': 'title, intro, date, cover.id'
  }

  const apiURL = 'https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?' + new URLSearchParams(params)
  // console.log(apiURL)

  const apiResponse = await fetch(apiURL)
  const apiResponseJSON = await apiResponse.json()
  // console.log(personResponseJSON.data)
   response.render('zuidoost.liquid', {stories: apiResponseJSON.data, page: 'zuidoost'})
})

app.get('/zoeken', async function (request, response) {
  const search = request.query.search || ''

   const params = {
    'fields': 'title, intro, date, cover.id',
    ...(search && {'filter[title][_icontains]': search})
  }

  const apiURL = 'https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?' + new URLSearchParams(params)
  // console.log(apiURL)

  const apiResponse = await fetch(apiURL)
  const apiResponseJSON = await apiResponse.json()
  // console.log(personResponseJSON.data)
   response.render('index.liquid', {stories: apiResponseJSON.data, search})
})

app.get('/zoeken', async function (request, response) {
  const search = request.query.search || ''

   const params = {
    'fields': 'title, intro, date, cover.id',
    ...(search && {'filter[title][_icontains]': search})
  }

  const apiURL = 'https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?' + new URLSearchParams(params)
  // console.log(apiURL)

  const apiResponse = await fetch(apiURL)
  const apiResponseJSON = await apiResponse.json()
  // console.log(personResponseJSON.data)
   response.render('nieuw-west', {stories: apiResponseJSON.data, search})
})

app.get('/algemeen-nieuws-nieuw-oud', async function (request, response) {
   // Render index.liquid uit de Views map
   // Geef hier eventueel data aan mee
   const params = {
    'filter[district]': 'algemeen',
    'fields': 'title, intro, date, cover.*',
    'sort': '-date'
  }

  const apiURL = 'https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?' + new URLSearchParams(params)
  // console.log(apiURL)

  const apiResponse = await fetch(apiURL)
  const apiResponseJSON = await apiResponse.json()
  // console.log(personResponseJSON.data)
   response.render('index.liquid', {stories: apiResponseJSON.data})
})

app.get('/algemeen-nieuws-oud-nieuw', async function (request, response) {
   // Render index.liquid uit de Views map
   // Geef hier eventueel data aan mee
   const params = {
    'filter[district]': 'algemeen',
    'fields': 'title, intro, date, cover.*',
    'sort': 'date'
  }

  const apiURL = 'https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?' + new URLSearchParams(params)
  // console.log(apiURL)

  const apiResponse = await fetch(apiURL)
  const apiResponseJSON = await apiResponse.json()
  // console.log(personResponseJSON.data)
   response.render('index.liquid', {stories: apiResponseJSON.data})
})

app.get('/algemeen-doelgroep-wijkpartner', async function (request, response) {
   // Render index.liquid uit de Views map
   // Geef hier eventueel data aan mee
   const params = {
    'filter[district]': 'algemeen',
    'filter[target_group]': 'wijkpartner',
    'fields': 'title, intro, date, cover.*, target_group',
    'sort': '-date'
  }

  const apiURL = 'https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?' + new URLSearchParams(params)
  // console.log(apiURL)

  const apiResponse = await fetch(apiURL)
  const apiResponseJSON = await apiResponse.json()
  // console.log(personResponseJSON.data)
   response.render('index.liquid', {stories: apiResponseJSON.data})
})

// Maak een POST route voor de index; hiermee kun je bijvoorbeeld formulieren afvangen
// Hier doen we nu nog niets mee, maar je kunt er mee spelen als je wilt
app.post('/collectie', async function (request, response) {
  // console.log('POST ontvangen:', request.body)

  // Stuur een POST request naar de messages database
  // Een POST request bevat ook extra parameters, naast een URL
  const fetchRes = await fetch('https://fdnd-agency.directus.app/items/buurtcampuskrant_saved_stories', {

    // overschrijf de standaard GET method
    method: 'POST',

    // geef de body mee als JSON string
    body: JSON.stringify({
      // Dit is zodat we ons artikel straks weer terug kunnen vinden met ons filter
      story: request.body.id,
      user: 1
    }),

    // En vergeet deze HTTP headers niet: hiermee vertellen we de server dat we JSON doorsturen
    // (In realistischere projecten zou je hier ook authentication headers of een sleutel meegeven)
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })

  const fetchData = await fetchRes.json()
  // console.log('Directus response:', fetchData)

  // zonder redirect wordt in de browser niets geplaats, alleen in directus
  if (fetchData.errors) {
        response.redirect('/collectie?error=true')
    } else {
        response.redirect('/collectie?success=true')
    }

})

app.get('/collectie', async function (request, response) {
  // Ophalen saved stories van user 1 (ik)
  const savedRes = await fetch('https://fdnd-agency.directus.app/items/buurtcampuskrant_saved_stories?filter[user][_eq]=1&fields=id,story')
  const savedData = await savedRes.json()

  // Ophalen van de details van story
  const ids = savedData.data.map(item => item.story).join(',')

  const storiesRes = await fetch(`https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?filter[id][_in]=${ids}&fields=id,title,date,cover.id`)
  const storiesData = await storiesRes.json()

  // Koppel het saved record ID aan elke story
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

// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000, als dit ergens gehost wordt, is het waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})