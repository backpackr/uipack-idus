# UIPACK-IDUS

[![npm version](https://badge.fury.io/js/uipack-idus.svg)](https://badge.fury.io/js/uipack-idus)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

UI used in [www.idus.com](https://www.idus.com/)

## Todo

- [ ] remove jquery

## UI GUIDE

[Demo](https://backpackr.github.io/uipack-idus/)

## Install

``` bash
npm install uipack-idus
```

## unpkg

``` html
<script src="http://unpkg.com/uipack-idus/dist/uipack.js"></script>
<link rel="stylesheet" href="http://unpkg.com/uipack-idus/dist/uipack.css">
```

## Element Properties

``` html
<div class="ui_example" data-uipack="example" data-state="active"></div>
```

- `class`: `css` 전용 셀렉터
- `data-uipack`: `js` 전용 셀렉터
- `data-state`: `css` & `js` 공용 프로퍼티 (`active`, `disabled`, etc...)
- `class` & `data-uipack` 네이밍은 동일하게 (스타일 클래스는 `ui_` 프리픽스 추가)

## File Naming

- 스타일관련 클래스명 === data-uipack 값 === 파일명
- scss file: `ui_example.scss`
- js file: `ui_example.js`

## SCSS convention

- BEM [Block Element Modifiers](http://getbem.com/introduction/);

``` html
## 하나의 컴포넌트에서 복수 클래스 사용 안함
<!-- 👎 -->
<div class="ui_card ui_card--story">
    ...
</div>

<!-- 👍 -->
<div class="ui_card--story">
    ...
</div>
```

``` scss
.ui_card {
    // base style
    ...

    // modifier
    &--story {
        @extend .ui_card;
        // extended style
        ...
    }
}

```
