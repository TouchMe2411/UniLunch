// Mock storage for reservations
let mockReservations = []

export const apiClient = {
  // Auth
  getCurrentUser: async () => {
    // В реальном приложении здесь будет запрос к API
    // Сейчас возвращаем моковые данные
    return {
      id: '1',
      email: 'user@example.com',
      isAdmin: false,
    }
  },

  signUp: async ({ email }) => {
    // In a real app, this would call your backend API
    return { success: true }
  },

  // Meals
  listMeals: async () => {
    // Mock data - replace with actual API call
    return [
      {
        id: '1',
        name: 'Spicy Thai Curry Tofu',
        description:
          'Crispy tofu cubes in a rich, spicy Thai red curry with bamboo shoots, bell peppers, and Thai basil. Served with jasmine rice.',
        price: 10.99,
        imageUrl: '',
        isVegetarian: true,
        isSpicy: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'Classic Burger',
        description: 'Juicy beef patty with lettuce, tomato, and special sauce',
        price: 12.99,
        imageUrl: 'https://placekitten.com/301/200',
        isVegetarian: false,
        isSpicy: false,
      },
    ]
  },

  getUserFavorites: async () => {
    // Mock implementation
    return ['1'] // Return array of meal IDs
  },

  toggleFavoriteMeal: async (mealId) => {
    // Mock implementation
    return { success: true }
  },
  // Reservations
  createReservation: async ({ mealId, quantity }) => {
    // Mock implementation - find the meal and create a reservation
    const meals = await apiClient.listMeals()
    const meal = meals.find((m) => m.id === mealId)

    if (!meal) {
      throw new Error('Meal not found')
    }

    const reservation = {
      id: Date.now().toString(), // Simple ID generation for mock
      meal,
      quantity,
      date: new Date().toISOString(),
      status: 'active',
    }

    mockReservations.push(reservation)
    return { success: true, reservation }
  },

  listUserReservations: async () => {
    // Mock implementation - return current reservations
    return mockReservations.filter((r) => r.status === 'active')
  },

  cancelReservation: async (reservationId) => {
    // Mock implementation
    const reservationIndex = mockReservations.findIndex((r) => r.id === reservationId)
    if (reservationIndex >= 0) {
      mockReservations[reservationIndex].status = 'cancelled'
    }
    return { success: true }
  },
}
