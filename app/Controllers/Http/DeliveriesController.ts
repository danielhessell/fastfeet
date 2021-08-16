import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Delivery from 'App/Models/Delivery'

export default class DeliveriesController {
  public async create({ request, response }: HttpContextContract) {
    const data = request.all()

    if (data.deliveryman) {
      const checkDeliverymanExists = await Delivery.findBy(
        'id',
        data.deliveryman
      )

      if (!checkDeliverymanExists) {
        return response.badRequest({ message: 'Deliveryman does not exists!' })
      }
    }

    const delivery = await Delivery.create(data)

    return delivery
  }

  public async update({ request, response, params }: HttpContextContract) {
    const data = request.all()

    const checkDeliveryExists = await Delivery.findBy('id', params.delivery_id)

    if (!checkDeliveryExists) {
      return response.badRequest({ message: 'Delivery does not exists!' })
    }

    const delivery = checkDeliveryExists

    delivery.product = data.product
    delivery.address = data.address
    delivery.postal_code = data.postal_code
    delivery.neighborhood = data.neighborhood
    delivery.city = data.city
    delivery.state = data.state

    await delivery.save()

    return delivery
  }
}