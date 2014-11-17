name: cover

# Les tests unitaires dans Magento 2

![Logo de Magento](images/magento-logo.png)

[@chadrien](https://twitter.com/chadrien)

???

- Qui a déjà fait des TU ?

---

# Disclaimer

- Il s'agit d'une introduction
- Je ne parlerais pas
  - de mock ;
  - de tests d'intégrations.
- Les exemples seront en java

<cite>© Atoine Vernois - <a href="http://avernois.github.io/prez-before_after_tdd/index-fr.html#/0/2">Unit testing after, before et TDD</a></cite>

---

# Disclaimer

- Il s'agit d'une introduction
- Je ne parlerais pas
  - de mock ;
  - de tests d'intégrations.
- <span style="text-decoration:line-through">Les exemples seront en java</span>

<cite>© Atoine Vernois - <a href="http://avernois.github.io/prez-before_after_tdd/index-fr.html#/0/2">Unit testing after, before et TDD</a></cite>

---
name: ecg

![ECG](images/ecg.jpg)

???

- Petites crises de tachycardie
- Médecin, cardiographie, épreuve d'effort, appareil pour monitorer pendant 24h
- Reformulation : j'ai ouvert un ticket auprès de mon médecin pour signaler ce qui
me semblait être une anomalie, suite à quoi il a couvert ça avec des tests

---
name: center-long-title

# Dis Jamy, c'est quoi un test unitaire ?

--

> En programmation informatique, le test unitaire (ou "T.U.") est une procédure permettant de vérifier le bon fonctionnement d'une partie précise d'un logiciel ou d'une portion d'un programme (appelée « unité » ou « module »).
>
> <cite>— Wikipedia</cite>

???

- Que dit Wikipédia ?
- Comme toujours c'est très encyclopédique. Qu'est-ce que j'en retiens ?

---
name: wiki-important

- <q>vérifier le bon fonctionnement…</q>

--
name: wiki-important

- <q>… d'une partie précise</q>

---
name: center-long-title

# Pourquoi faire des tests ?

--

- Vérifier que le code fait ce qu'il est censé faire

???

- Mais attention à ne pas tester n'importe quoi. En réalité ce qu'on veut
tester ce sont les fonctionnalités de notre application. Quel intérêt de véfirier
qu'une méthode fait la somme de plusieurs nombres ? Aucun, je sais faire une addition.
Quel intérêt de vérifier que je sais calculer correctement le montant de mon
panier ? Vital, c'est le cœur de mon métier.

--

  - ni plus, ni moins

???

- Faire un test trop petit ne sert à rien
- Faire un test trop gros nous empêchera de savoir ce qui ne va pas : si un test
qui teste trop de choses échoue, comment savoir ce qui est cassé ?

--

- Détecter les bugs au plus tôt

???

- Le test est une arme anti-dette technique. Elle ne l'éradique pas, mais elle
peut y contribuer

--

- Les tests sont un filet de sécurité

???

- Je n'ai plus peur de tout casser à la moindre modification du code

--

- Et beaucoup d'autres avantages

???

- Émergence d'un meilleur design, les tests sont une forme de documentation, etc.

---
name: center-long-title

# Pourquoi on ne fait pas de tests ?

--

- J'ai pas le temps

???

- Souvent les tests (et le test first surtout), va permettre l'émergence d'un
design de code qui vous aurez certainement pris beaucoup plus de temps à faire
"from scratch" et en navigant à vue

--

- C'est une perte de temps

???

- Les tests permettent de se concentrer sur les fonctionnalités réels de notre
application et évitent de se perdre dans les éternels "non mais attends, fait je
vais plutôt faire mon code comme ça, avec 60 niveaux d'abstraction, comma ça, si
le client veut saisir une donnée sous la pleine lune enroulé dans du jambon, il
peut !". C'est ça la vrai perte de temps

--

- De toute façon mon code marche, pas besoin de tester

???

- La pire excuse. Oui il marche aujourd'hui, et encore, les cas limites sont-ils
toujours prévus ? Le fameux, "aaaaah oui c'est vrai que dans ce cas là, ça bug".
Et au moment de faire évoluer l'application, vous êtes bien sûr de ne jamais
introduire de régression ? "Ah merde ça marchait avant la mise en prod ça"

---
name: center-title

# Faites des tests&nbsp;!

---
name: center-long-title

# À quoi ça ressemble un test ?

---

```php
class Cart
{
    public function getTotal()
    {
        return array_reduce(
            $this->products,
            function ($total, $product) {
                return $total + $product->getPrice();
            }
        )
    }
}
```

```php
function testCartGetTotal() {
    $product1 = newRandomProduct();
    $product2 = newRandomProduct();

    $cart = new Cart();
    $cart->addProduct($product1);
    $cart->addProduct($product2);

    $expected = $product1->getPrice() + $product2->getPrice();

    if ($expected != $cart->getTotal) {
        return false
    }

    return true;
}
```

???

- C'est bien mignon, mais on ne va pas tout faire à la main ?

---
name: center-title

# PHPUnit

--

- xUnit

???

- C'est une base de framework de test, qui vient de SUnit pour smalltalk
- Il comprend donc…

--

- un runner

???

- Capable d'exécuter les tests écrits pour PHPUnit

--

- un TestCase

???

- La classe de test de base, dont tous les tests vont hériter

--

- des fixtures

???

- Permettent de définir des préconditions afin de mettre de se mettre dans un
état qui va nous permettre d'exécuter nos tests. Attention à rendre un état
"propre" après avoir fini un test

--

- des tests suite

???

- Une test suite est un ensemble de tests partageant les mêmes fixtures. L'ordre
des tests ne doit pas avoir d'importance !

--

- L'exécution des tests : `setup`, `test`, `teardown`

--

- Un ou des formatters

???

- Les formatters ont pour rôle de formatter les résultats des tests : texte brut,
xml, json, etc.

--

- des assertions

???

- Une assertion est une fonction qui va permetter de vérifier un état (
assertEquals, assertContains, assertExists, etc.)

---
name: big-font

# Test Driven Development

Développement piloté par les tests

???

- Écrire les tests avant le code (test first)
- TDD se décompose en 3 étapges

---
name: red

# Red

???

- J'écris un test
- Je vérifie qu'il échoue afin de tester sa validité

---
name: green

# Green

???

- Écriture du code minimum pour que le test passe
- Code minimum = valeurs harcodées, tout en vrac dans une même méthode, etc.

---
name: green

# Refactor

???

- J'améliore le code produit en étant assuré de ne rien cassé grâce à mon test
- Lorsque le refactoring est fini : on recommence avec un nouveau test

---
name: cover

# Les tests unitaires dans Magento 2

![Logo de Magento](images/magento-logo.png)

[@chadrien](https://twitter.com/chadrien)

???

- L'intro peut paraître longue mais il était important de parler du
POURQUOI des tests unitaires avant de parler du COMMENT.
- Commençons par l'histoire des tests Magento, avec Magento 1.x

---
name: big-font

# Les tests unitaires dans Magento 1

--
name: big-font

What about no?

???

- Pas de TU dans Magento 1 sauf si on installe un module créé par la communauté

--
name: big-font

Au mieux, le MTAF

???

- Magento Test Automation Framework
- Tests fonctionnels, pas unitaires

--
name: big-font

Ou <code>EcomDev_PHPUnit</code>

???

Un module de la communauté

---

# Dans Magento 2

--

- <code>dev/tests</code>

???

- functional
- integration
- js
- performance
- static
- unit

--

- Basé sur PHPUnit

--

- Tests: 11688, Assertions: 27899, Incomplete: 30, Skipped: 2.

--

- <code>app</code> : 41% de couverture

???

- C'est pas mal mais il y a encore du boulot…

--

- <code>$this->markTestIncomplete('Requires refactoring of class that is tested, covers to many methods');</code>

???

- … genre vraiment !
- On va maintenant finir cette présentation avec un exemple concret

---
name: du-code

# Du code !

---
name: bigger-font

# Tester quoi ?

- Un bloc qui retourne les microdata d'un produit, avec des données en plus si mon produit est en promo

--
name: bigger-font

  - Si produit non en promo, retourne les microdata “classiques”
  - Si produit en promo, retourne les même microdata PLUS des microdata spécifiques

---
name: small-code

<code style="font-size:20px">unit/testsuite/Chadrien/Mageconf/Block/MicrodataTest.php</code>

```php
<?php

namespace Chadrien\Mageconf\Block;
use Magento\Test\BaseTestCase;

class MicrodataTest extends BaseTestCase
{
    private $SUT;
    private $productData = ['name' => 'Magento EE', 'price' => '100000.00'];

    public function setUp() { /* Magic */ }
    private function addProductToRegistry() { /* Magic */ }

    public function testCanGenerateMicrodataForAProduct()
    {
        $this->addProductToRegistry();
        $this->assertEquals(
            ['rootScope' => [
                'url' => 'http://schema.org/Product',
                'name' => 'Magento EE',
                'offers' => [
                    'url' => 'http://schema.org/Offer',
                    'price' => '100000.00',
                ],
            ]],
            $this->SUT->getMicrodata()
        );
    }
}
```

???

- Je commence par préparer ma classe de test

---

<code style="font-size:20px">app/code/Chadrien/Mageconf/Block/Microdata.php</code>

```php
<?php

namespace Chadrien\Mageconf\Block;

use Magento\Framework\View\Element\Template;

class Microdata extends Template
{
    protected $_template = 'metadata.phtml';

    public function __construct(Template\Context $context, array $data = [])
    {
        parent::__construct($context, $data);
    }

    public function getMicrodata()
    {
    }
}
```

???

- Ensuite je fais juste en sorte de ne pas avoir de fatal error

---

```bash
vendor/bin/phpunit --bootstrap dev/tests/unit/framework/bootstrap.php --configuration dev/tests/static/phpunit.xml.dist dev/tests/unit/testsuite/Chadrien/Mageconf/Block/MicrodataTest.php
PHPUnit 4.1.0 by Sebastian Bergmann.

Configuration read from /Users/chadrien/projects/magento/magento2/dev/tests/static/phpunit.xml.dist

F

Time: 133 ms, Memory: 11.00Mb

There was 1 failure:

1) Chadrien\Mageconf\Block\MicrodataTest::testCanGenerateMicrodataForAProduct
null does not match expected type "array".

dev/tests/unit/testsuite/Chadrien/Mageconf/Block/MicrodataTest.php:47
FAILURES!
Tests: 1, Assertions: 1, Failures: 1.
```

<div class="red-block"></div>

---
name: smaller-code

<code style="font-size:20px">app/code/Chadrien/Mageconf/Block/Microdata.php</code>

```php
<?php

namespace Chadrien\Mageconf\Block;

use Magento\Framework\View\Element\Template;
use Magento\Framework\Registry;

class Microdata extends Template
{
    protected $_template = 'metadata.phtml';
    private $registry;

    public function __construct(Template\Context $context, array $data = [], Registry $registry)
    {
        parent::__construct($context, $data);
        $this->registry = $registry;
    }

    public function getMicrodata()
    {
        $product = $this->registry->registry('product');
        return ['rootScope' => [
            'url' => 'http://schema.org/Product',
            'name' => $product->getName(),
            'offers' => [
                'url' => 'http://schema.org/Offer',
                'price' => $product->getPrice(),
            ],
        ]];
    }
}
```

---

```bash
vendor/bin/phpunit --bootstrap dev/tests/unit/framework/bootstrap.php --configuration dev/tests/static/phpunit.xml.dist dev/tests/unit/testsuite/Chadrien/Mageconf/Block/MicrodataTest.php
PHPUnit 4.1.0 by Sebastian Bergmann.

Configuration read from /Users/chadrien/projects/magento/magento2/dev/tests/static/phpunit.xml.dist

.

Time: 171 ms, Memory: 11.00Mb

OK (1 test, 1 assertion)
```

<div class="green-block"></div>

---
name: smaller-code

<code style="font-size:20px">unit/testsuite/Chadrien/Mageconf/Block/MicrodataTest.php</code>

```php
<?php

namespace Chadrien\Mageconf\Block;
use Magento\Test\BaseTestCase;

class MicrodataTest extends BaseTestCase
{
    private $SUT;
    private $productData = ['name' => 'Magento EE', 'price' => '100000.00'];

    public function setUp() { /* Magic */ }
    private function addProductToRegistry() { /* Magic */ }
    public function testCanGenerateMicrodataForAProduct() { /* … */ }

    public function testCanGenerateMicrodataForASale()
    {
        $this->productData = array_merge($this->productData, ['specialToDate' => '2014-11-20 23:59:59', 'finalPrice' => '0.00']);
        $this->addProductToRegistry();

        $this->assertEquals(
            ['rootScope' => [
                'url' => 'http://schema.org/Product',
                'name' => 'Magento EE',
                'offers' => [
                    'url' => 'http://schema.org/Offer',
                    'price' => '0.00',
                    'priceValidUntil' => '2014-11-20 23:59:59',
                ],
            ]],
            $this->SUT->getMicrodata()
        );
    }
}
```

---

```bash
.F

Time: 150 ms, Memory: 11.00Mb

There was 1 failure:

1) Chadrien\Mageconf\Block\MicrodataTest::testCanGenerateMicrodataForASale
Failed asserting that two arrays are equal.
--- Expected
+++ Actual
@@ @@
             'url' => 'http://schema.org/Offer'
-            'price' => '0.00'
-            'priceValidUntil' => '2014-11-20 23:59:59'
+            'price' => '100000.00'
         )
     )
 )

dev/tests/unit/testsuite/Chadrien/Mageconf/Block/MicrodataTest.php:73

FAILURES!
Tests: 2, Assertions: 2, Failures: 1.
```

<div class="red-block"></div>

---
name: even-smaller-code

<code style="font-size:20px">app/code/Chadrien/Mageconf/Block/Microdata.php</code>

```php
<?php

namespace Chadrien\Mageconf\Block;

use Magento\Framework\View\Element\Template;
use Magento\Framework\Registry;

class Microdata extends Template
{
    protected $_template = 'metadata.phtml';
    private $registry;

    public function __construct(Template\Context $context, array $data = [], Registry $registry) { /* … */ }

    public function getMicrodata()
    {
        $product = $this->registry->registry('product');
        $microdata = ['rootScope' => [
            'url' => 'http://schema.org/Product',
            'name' => $product->getName(),
            'offers' => [
                'url' => 'http://schema.org/Offer',
                'price' => $product->getPrice(),
            ],
        ]];

        if($product->getFinalPrice() < $product->getPrice() && $product->getSpecialToDate()) {
            $microdata['rootScope']['offers']['priceValidUntil'] = $product->getSpecialToDate();
            $microdata['rootScope']['offers']['price'] = $product->getFinalPrice();
        }

        return $microdata;
    }
}
```

???

- Disclaimer : ne faîtes pas ça en vrai ! Il y a des méthodes dépréciées, et cie.

---

```bash
vendor/bin/phpunit --bootstrap dev/tests/unit/framework/bootstrap.php --configuration dev/tests/static/phpunit.xml.dist dev/tests/unit/testsuite/Chadrien/Mageconf/Block/MicrodataTest.php
PHPUnit 4.1.0 by Sebastian Bergmann.

Configuration read from /Users/chadrien/projects/magento/magento2/dev/tests/static/phpunit.xml.dist

..

Time: 154 ms, Memory: 11.25Mb

OK (2 tests, 2 assertions)
```

<div class="green-block"></div>

---
name: even-smaller-code

```php
<?php

namespace Chadrien\Mageconf\Block;

use Magento\Framework\View\Element\Template;
use Magento\Framework\Registry;

class Microdata extends Template
{
    protected $_template = 'metadata.phtml';
    private $registry;
    public function __construct(Template\Context $context, array $data = [], Registry $registry) { /* … */ }
    public function getMicrodata()
    {
        $product = $this->registry->registry('product');
        $microdata = ['rootScope' => [
            'url' => 'http://schema.org/Product',
            'name' => $product->getName(),
            'offers' => [
                'url' => 'http://schema.org/Offer',
                'price' => $product->getPrice(),
            ],
        ]];

        if($this->isProductOnSale($product)) {
            $microdata = $this->addSaleMicrodata($product, $microdata);
        }

        return $microdata;
    }
    private function isProductOnSale(\Magento\Catalog\Model\Product $product)
    {
        return $product->getFinalPrice() < $product->getPrice() && $product->getSpecialToDate();
    }
    private function addSaleMicrodata(\Magento\Catalog\Model\Product $product, array $microdata)
    {
        $microdata['rootScope']['offers']['priceValidUntil'] = $product->getSpecialToDate();
        $microdata['rootScope']['offers']['price'] = $product->getFinalPrice();
        return $microdata;
    }
}
```

???

- Méthode `isProductOnSale` parce que ce qui m'intéresse réellement, c'est de
savoir si mon produit est en promo, quelle que soit la manière dont je le sais
- `addSaleMicrodata` parce que en ce que je ne veux pas simplement ajouter une
donnée et modifier la valeur d'une autre, j'exprime le fait que je fais quelque
chose de spécifique pour un produit en promo

---

```bash
vendor/bin/phpunit --bootstrap dev/tests/unit/framework/bootstrap.php --configuration dev/tests/static/phpunit.xml.dist dev/tests/unit/testsuite/Chadrien/Mageconf/Block/MicrodataTest.php
PHPUnit 4.1.0 by Sebastian Bergmann.

Configuration read from /Users/chadrien/projects/magento/magento2/dev/tests/static/phpunit.xml.dist

..

Time: 154 ms, Memory: 11.25Mb

OK (2 tests, 2 assertions)
```

<div class="green-block"></div>

---
name: du-code

# Merci !
