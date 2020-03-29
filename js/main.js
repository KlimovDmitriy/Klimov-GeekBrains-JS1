function createProduct(product) {
  return {
    productId : product.productId,
    code: product.code,
    title: product.title,
    description: product.description,
    primaryImageUrl: product.primaryImageUrl.slice(0, -4) + '_220x220_1' + product.primaryImageUrl.slice(-4) ,
    assocProducts: product.assocProducts.slice(0,-1).split(';'),
    weight: product.weight,
    unit: product.unit,
    unitFull: product.unitFull,
    unitRatio: product.unitRatio,
    unitAlt: product.unitAlt,
    unitRatioAlt: product.unitRatioAlt,
    unitFullAlt: product.unitFullAlt,
    priceRetail: product.priceRetail,
    priceRetailAlt: product.priceRetailAlt,
    priceGold: product.priceGold,
    priceGoldAlt: product.priceGoldAlt,
    bonusAmount: product.bonusAmount,
    hasAlternateUnit: product.hasAlternateUnit,
    isActive: product.isActive,
    modified: product.modified,
    quantity: 1,


    createTemplate() {
      return `
            <div id="products_section">
            <div class="products_page pg_0">
                <div class="product product_horizontal">                                
                    <span class="product_code">Код: ${this.code}</span>
                    <div class="product_status_tooltip_container">
                        <span class="product_status">Наличие</span>
                    </div>                                
                    <div class="product_photo">
                        <a href="#" class="url--link product__link">
                            <img src="${this.primaryImageUrl}">
                        </a>                                    
                    </div>
                    <div class="product_description">
                        <a href="#" class="product__link">${this.description}</a>
                    </div>
                    <div class="product_tags hidden-sm">
                        <p id="${this.code}needed">Могут понадобиться:</p>

                    </div>
                    <div class="product_units">
                        <div class="unit--wrapper">
                            <div class="unit--select unit--active" id="${this.code}firstselector">
                                <p class="ng-binding" data-unit="first" data-unitid="${this.code}">За ${this.unitAlt}</p>
                            </div>
                            <div class="unit--select" id="${this.code}secondselector">
                                <p class="ng-binding" data-unit="second" data-unitid="${this.code}">За ${this.unit}</p>
                            </div>
                        </div>
                    </div>
                    <p class="product_price_club_card">
                        <span class="product_price_club_card_text">По карте<br>клуба</span>
                        <span class="goldPrice first" data-id="${this.code}first">${this.priceGoldAlt}</span>
                        <span class="goldPrice second" data-id="${this.code}second"style = "display: none">${this.priceGold}</span>
                        <span class="rouble__i black__i">
                            <svg version="1.0" id="rouble__b" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="30px" height="22px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
                               <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rouble_black"></use>
                            </svg>
                         </span>
                    </p>
                    <p class="product_price_default">
                        <span class="retailPrice first" data-id="${this.code}first">${this.priceRetailAlt}</span>
                        <span class="retailPrice second" data-id="${this.code}second" style="display: none">${this.priceRetail}</span>
                        <span class="rouble__i black__i">
                            <svg version="1.0" id="rouble__g" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="30px" height="22px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
                               <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rouble_gray"></use>
                            </svg>
                         </span>
                    </p>
                    <div class="product_price_points">
                        <p class="ng-binding">Можно купить за 231,75 балла</p>
                    </div>
                    <div class="list--unit-padd"></div>
                    <div class="list--unit-desc">
                        <div class="unit--info">
                            <div class="unit--desc-i"></div>
                            <div class="unit--desc-t">
                                <p>
                                    <span class="ng-binding">Продается ${this.unitFull}ми:</span>
                                    <span class="unit--infoInn">1 ${this.unit} = ${(1/this.unitRatioAlt).toFixed(2)} ${this.unitAlt}. </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="product__wrapper">
                        <div class="product_count_wrapper">
                            <div class="stepper">
                                <input class="product__count stepper-input" id="${this.code}counter" type="text" value="${this.quantity}">
                                <span class="stepper-arrow up" data-name="up" data-id = "${this.code}"></span>
                                <span class="stepper-arrow down" data-name = "down" data-id = "${this.code}"></span>                                            
                            </div>
                        </div>
                        <span class="btn btn_cart" data-url="/cart/" >
                            <svg class="ic ic_cart">
                               <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart"></use>
                            </svg>
                            <span class="ng-binding" data-product-id="${this.productId}">В корзину</span>
                        </span>
                    </div>
                </div>
            </div>
        </div> `;
    }
  };
}

let catalog = {
  items: [],
  container: ".test",
  catalogUrl:
    "products.json",

  init() {
    this.items = [];
    this.getData(this.catalogUrl).finally(() => {
      this._fetchItems();
      this._render();
      this.items.forEach(item => {item.assocProducts.forEach(asp => {
          var temp = document.getElementById(item.code+'needed');
          temp.appendChild(document.createElement('a')).innerHTML = asp
          for(var i = 1; i < temp.childNodes.length; i++){
              temp.childNodes[i].classList.add('url--link')
              temp.childNodes[i].setAttribute('href', '#')
          }
      }) }
    ),
      this._changeCounter();
      this._changePrice();
      
      
        })
    

    
  },
  async getData(url) {
    const data = await fetch(url);
      const data2 = await data.json();
      this.items = data2;

  },

  _changePrice(){
        [].forEach.call(document.querySelectorAll(".unit--wrapper"), btn =>
        {
            btn.addEventListener("click", (evt) => {
                if(evt.target.dataset.unit == "second"){                    
                    [].forEach.call(document.querySelectorAll('[data-id="'+evt.target.dataset.unitid+'first"]'), hid =>{
                        hid.style.display = 'none';
                    });
                    [].forEach.call(document.querySelectorAll('[data-id="'+evt.target.dataset.unitid+'second"]'), hid =>{
                        hid.style.display = '';
                }); 
                evt.target.parentNode.classList.add('unit--active');
                document.getElementById(evt.target.dataset.unitid+'firstselector').classList.remove('unit--active')
            }
                if(evt.target.dataset.unit == "first"){
                    [].forEach.call(document.querySelectorAll('[data-id="'+evt.target.dataset.unitid+'second"]'), hid =>{
                        hid.style.display = 'none';
                    });
                    [].forEach.call(document.querySelectorAll('[data-id="'+evt.target.dataset.unitid+'first"]'), hid =>{
                        hid.style.display = '';
                        evt.target.parentNode.classList.add('unit--active');
                document.getElementById(evt.target.dataset.unitid+'secondselector').classList.remove('unit--active')
                })
                }
            })
        })
  },

  _changeCounter(){
    [].forEach.call(document.querySelectorAll(".stepper"), (blk) => {

        blk.addEventListener("click", (evt) => {
            if (evt.target.dataset.name === 'up') {
                document.getElementById(evt.target.dataset.id + 'counter').value++
            }
            if (evt.target.dataset.name === 'down' && document.getElementById(evt.target.dataset.id + 'counter').value > 1 ) {
              document.getElementById(evt.target.dataset.id + 'counter').value--
            }
        })
    })

  },
  _fetchItems() {
    let arr = [];

    this.items.forEach(item => {
      arr.push(createProduct(item));
    });
    this.items = arr;
  },
  _render() {
    let container = document.querySelector(this.container);
    let domString = "";

    this.items.forEach(item => {
      domString += item.createTemplate();
      

    });
    container.innerHTML = domString;
    
  },
};

catalog.init();

