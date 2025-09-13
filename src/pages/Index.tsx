import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Pizza {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  popular?: boolean;
}

interface CartItem {
  pizza: Pizza;
  quantity: number;
}

const pizzas: Pizza[] = [
  {
    id: 1,
    name: 'Маргарита',
    description: 'Моцарелла, томатный соус, свежий базилик',
    price: 590,
    image: '/img/dbbaa92a-923e-4f9c-ae28-e77baf91f760.jpg',
    popular: true
  },
  {
    id: 2,
    name: 'Пепперони',
    description: 'Пепперони, моцарелла, томатный соус',
    price: 690,
    image: '/img/09a19dcf-0c92-4ffb-a0b9-d7c98ab84454.jpg',
    popular: true
  },
  {
    id: 3,
    name: 'Гавайская',
    description: 'Ветчина, ананасы, моцарелла, томатный соус',
    price: 750,
    image: '/img/e5509085-7af6-4454-b2d5-d41ffd74c8de.jpg'
  }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (pizza: Pizza) => {
    setCart(prev => {
      const existing = prev.find(item => item.pizza.id === pizza.id);
      if (existing) {
        return prev.map(item =>
          item.pizza.id === pizza.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { pizza, quantity: 1 }];
    });
  };

  const removeFromCart = (pizzaId: number) => {
    setCart(prev => prev.filter(item => item.pizza.id !== pizzaId));
  };

  const updateQuantity = (pizzaId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(pizzaId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.pizza.id === pizzaId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.pizza.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-pizza-light">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Pizza" className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-pizza-dark">PIZZA Delivery</h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#menu" className="text-pizza-dark hover:text-primary font-medium">Меню</a>
              <a href="#promo" className="text-pizza-dark hover:text-primary font-medium">Акции</a>
              <a href="#contacts" className="text-pizza-dark hover:text-primary font-medium">Контакты</a>
            </nav>

            <Button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative bg-primary hover:bg-primary/90 text-white"
            >
              <Icon name="ShoppingCart" className="w-5 h-5 mr-2" />
              Корзина
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-pizza-red text-white h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-pizza-red text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">Доставка пиццы за 30 минут</h2>
          <p className="text-xl mb-8 opacity-90">Свежая, горячая пицца прямо к вашему дому</p>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="Clock" className="w-6 h-6" />
              </div>
              <div>
                <div className="font-semibold">30 минут</div>
                <div className="text-sm opacity-80">Быстрая доставка</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="Truck" className="w-6 h-6" />
              </div>
              <div>
                <div className="font-semibold">Бесплатно</div>
                <div className="text-sm opacity-80">При заказе от 999₽</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="Shield" className="w-6 h-6" />
              </div>
              <div>
                <div className="font-semibold">Качество</div>
                <div className="text-sm opacity-80">100% гарантия</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center text-pizza-dark mb-12">Наше меню</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pizzas.map(pizza => (
              <Card key={pizza.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative">
                  <img 
                    src={pizza.image} 
                    alt={pizza.name}
                    className="w-full h-48 object-cover"
                  />
                  {pizza.popular && (
                    <Badge className="absolute top-3 left-3 bg-pizza-red text-white">
                      Популярная
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-pizza-dark">{pizza.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {pizza.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-pizza-dark">{pizza.price}₽</div>
                    <Button 
                      onClick={() => addToCart(pizza)}
                      className="bg-primary hover:bg-primary/90 text-white"
                    >
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <section id="promo" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center text-pizza-dark mb-12">Акции</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-r from-primary to-pizza-red text-white">
              <CardHeader>
                <CardTitle className="text-2xl">🔥 Горячая акция</CardTitle>
                <CardDescription className="text-white/90">
                  При заказе от 1500₽ - вторая пицца в подарок!
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-gradient-to-r from-accent to-yellow-300">
              <CardHeader>
                <CardTitle className="text-2xl text-pizza-dark">⚡ Быстрая доставка</CardTitle>
                <CardDescription className="text-pizza-dark/80">
                  Доставим за 20 минут или пицца бесплатно
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-16 bg-pizza-light">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center text-pizza-dark mb-12">Контакты</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Icon name="Phone" className="w-12 h-12 mx-auto text-primary mb-4" />
                <CardTitle>Телефон</CardTitle>
                <CardDescription>+7 (999) 123-45-67</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Icon name="MapPin" className="w-12 h-12 mx-auto text-primary mb-4" />
                <CardTitle>Адрес</CardTitle>
                <CardDescription>г. Москва, ул. Пушкина, д. 10</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Icon name="Clock" className="w-12 h-12 mx-auto text-primary mb-4" />
                <CardTitle>Режим работы</CardTitle>
                <CardDescription>Ежедневно с 10:00 до 23:00</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="flex-1 bg-black/50" 
            onClick={() => setIsCartOpen(false)}
          />
          <div className="w-96 bg-white h-full overflow-y-auto shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-pizza-dark">Корзина</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsCartOpen(false)}
                >
                  <Icon name="X" className="w-5 h-5" />
                </Button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="ShoppingCart" className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Корзина пуста</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <Card key={item.pizza.id} className="p-4">
                        <div className="flex items-center space-x-4">
                          <img 
                            src={item.pizza.image} 
                            alt={item.pizza.name}
                            className="w-16 h-16 rounded object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-pizza-dark">{item.pizza.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.pizza.price}₽</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.pizza.id, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.pizza.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        <Separator className="my-3" />
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-pizza-dark">
                            {item.pizza.price * item.quantity}₽
                          </span>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removeFromCart(item.pizza.id)}
                          >
                            <Icon name="Trash2" className="w-4 h-4" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <Separator className="mb-6" />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xl font-bold text-pizza-dark">
                      <span>Итого:</span>
                      <span>{getTotalPrice()}₽</span>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                      <Icon name="CreditCard" className="w-5 h-5 mr-2" />
                      Оформить заказ
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}