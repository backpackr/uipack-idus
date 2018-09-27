const template = {
    btn: '<button type="button" class="ui_btn">ui_btn</button>',

    rating: `
    <div class="ui_rating" data-uipack="rating" data-value="2.5">
        <i class="ui_rating__icon"></i>
        <i class="ui_rating__icon"></i>
        <i class="ui_rating__icon"></i>
        <i class="ui_rating__icon"></i>
        <i class="ui_rating__icon"></i>
    </div>`,

    card: `
    <div class="ui_card">
        <button type="button" class="ui_card__overlay">i</button>
        <div class="ui_card__imgcover">
            <a href="#link1" class="ui_card__img" style="background-image: url('https://image.idus.com/image/files/d6843d7f602840cdbe7b827286f30460_320.jpg');"></a>
        </div>
        <div class="ui_card__info">
            <a href="#link2" class="ui_card__label">ui_card__label</a>
            <a href="#link3" class="ui_card__title">ui_card__title</a>
            <div class="ui_card__cost">
                <span class="ui_card__hilight">hilight</span>
                <span class="ui_card__crossout">crossout</span>
            </div>
        </div>
        <div class="ui_card__rating">
            <div class="ui_card__vcenter">
                <div class="ui_rating" data-uipack="rating" data-value="3">
                    <i class="ui_rating__icon"></i>
                    <i class="ui_rating__icon"></i>
                    <i class="ui_rating__icon"></i>
                    <i class="ui_rating__icon"></i>
                    <i class="ui_rating__icon"></i>
                </div>
            </div>
            <span class="ui_card__comment">Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
                tenetur quo et quaerat a ullam voluptatum libero quis totam quae odit cum placeat consequatur,
                autem laboriosam veniam quidem. Amet, quasi.</span>
        </div>
    </div>`,

    cardSide: `
    <div class="ui_card--side">
        <div class="ui_card__inner">
            <div class="ui_card__imgcover">
                <a href="#" class="ui_card__img" style="background-image: url('https://image.idus.com/image/files/d6843d7f602840cdbe7b827286f30460_320.jpg');">
                </a>
            </div>
            <div class="ui_card__txtarea">
                <div class="ui_card__info">
                    <a href="#" class="ui_card__title">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Excepturi odit dolores, ullam dicta eveniet sit, consectetur asperiores quasi
                        voluptatem natus, sunt aliquid cum omnis magnam aperiam enim aliquam accusamus vel!</a>
                    <span class="ui_card__para">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
                        provident aperiam cupiditate, asperiores, consequuntur odit quis dolores officiis
                        consectetur delectus nisi omnis illum. Nostrum voluptatem tempora reprehenderit animi
                        ipsa fuga!</span>
                </div>

                <div class="ui_card__rating">
                    <div class="ui_card__vcenter">
                        <div class="ui_rating" data-uipack="rating" data-value="3">
                            <i class="ui_rating__icon"></i>
                            <i class="ui_rating__icon"></i>
                            <i class="ui_rating__icon"></i>
                            <i class="ui_rating__icon"></i>
                            <i class="ui_rating__icon"></i>
                            <span>&nbsp;| John Doe</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`,

    grid: `
    <div class="ui_grid">
        <div class="ui_grid__cols--5 ui_grid__cols--m1">
            <div class="ui_grid__item">
                <div>item</div>
            </div>
            <div class="ui_grid__item">
                <div>item</div>
            </div>
            <div class="ui_grid__item">
                <div>item</div>
            </div>
            <div class="ui_grid__item">
                <div>item</div>
            </div>
            <div class="ui_grid__item">
                <div>item</div>
            </div>
        </div>
    </div>
    `,

    title: `
    <div class="ui_title">
        <a href="#" class="ui_title__txt">ui_title__txt</a>
        <span class="ui_title__txtright">ui_title__txtright</span>
    </div>
    `
};

export default template;