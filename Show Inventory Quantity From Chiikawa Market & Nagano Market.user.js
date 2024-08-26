// ==UserScript==
// @name         Show Inventory Quantity From Chiikawa Market & Nagano Market
// @namespace    http://your-namespace.com
// @version      2.0
// @description  Show the value of data-inventory-quantity attribute on Chiikawa Market & Nagano Market
// @match        https://chiikawamarket.jp/products/*
// @match        https://chiikawamarket.jp/collections/*/products/*
// @match        https://chiikawamarket.jp/cart
// @match        https://nagano-market.jp/products/*
// @match        https://nagano-market.jp/collections/*/products/*
// @match        https://nagano-market.jp/cart
// @match        https://nagano-market.jp/*/products/*
// @match        https://nagano-market.jp/*/collections/*/products/*
// @match        https://nagano-market.jp/*/cart
// @grant        none
// @author       Bird
// ==/UserScript==

(function() {
    'use strict';
    // Check if the target page is the Chiikawa Market cart page
    if (document.location.pathname.includes("/cart"))
        {
        for (const item of document.getElementsByClassName("cart--item"))
            {
                const inventoryQuantity = item.getAttribute("data-inventory-quantity");
                const label = item.getElementsByClassName("cart--item--title")?.[0]?.children?.[0]?.children?.[0];
                if (inventoryQuantity !== undefined && label) {
                    ShowInventoryQuantity(label, inventoryQuantity);
                }
            }
        }
    else
        {
            var targetOption = document.querySelector('div.product-form--options > select > option');
            if (targetOption) {
                var inventoryQuantity = targetOption.getAttribute('data-inventory-quantity');
                var productTitle = document.querySelector('.product-page--title[data-item="section-heading"]');
                ShowInventoryQuantity(productTitle, inventoryQuantity);
            }
        }

    function ShowInventoryQuantity(productTitle, inventoryQuantity)
        {
            if (inventoryQuantity > 0)
            {
                productTitle.textContent += ' (仲有' + inventoryQuantity + '個)';
            }
            else
            {
                productTitle.textContent += ' (Sold out!)';
            }
        }
})();