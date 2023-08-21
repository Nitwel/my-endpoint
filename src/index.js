let calls = 0

export default function (router) {
	router.get('/:region/:city', async (req, res) => {

		const region = req.params.region ?? 'Europe'
		const city = req.params.city ?? 'Berlin'

		const itemsService = new API.ItemsService('text')

		calls++

		try {
			const directus = await API.fetch(`http://worldtimeapi.org/api/timezone/${region}/${city}`)

			const data = await directus.json()

			await itemsService.createOne({ text: `This was created at ${data.datetime} relative to ${region}/${city}` })

			res.send(`It is ${data.datetime} and this endpoint has been called ${calls} times, version 2.0!!`)
		} catch (error) {
			res.send(`${error}`)
		}
	});
};
