// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="Topic_RengaDevGuide.html">Руководство разработчика Renga</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="Topic_RengaDevGuide_Common.html">Общие сведения</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="Topic_RengaDevGuide_Common_AboutCOMAPI.html">О Renga COM API</a></li><li class="chapter-item expanded "><a href="Topic_RengaDevGuide_Common_AboutSDK.html">Renga SDK</a></li><li class="chapter-item expanded "><a href="Topic_RengaDevGuide_Common_AddReferences.html">Подключение библиотек</a></li><li class="chapter-item expanded "><a href="Topic_RengaDevGuide_Common_ConnectToRenga.html">Подключение к приложению Renga</a></li><li class="chapter-item expanded "><a href="Topic_RengaDevGuide_Common_AppSamples.html">Примеры приложений и курсы</a></li><li class="chapter-item expanded "><a href="Topic_RengaDevGuide_Common_ApiLimits.html">Ограничения API</a></li></ol></li><li class="chapter-item expanded "><a href="Topic_RengaDevGuide_AppProcessing.html">Взаимодействие с приложением Renga</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="Topic_RengaDevGuide_AppProcessing_View.html">Работа с видом</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="Topic_RengaDevGuide_AppProcessing_View_Camera.html">Работа с камерой</a></li><li class="chapter-item expanded "><a href="Topic_RengaDevGuide_AppProcessing_View_Screens.html">Создание скриншотов сцены</a></li><li class="chapter-item expanded "><a href="Topic_RengaDevGuide_AppProcessing_View_Visibility.html">Управление видимостью объектов</a></li></ol></li><li class="chapter-item expanded "><a href="Topic_RengaDevGuide_AppProcessing_Selection.html">Работа с выборкой объектов</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="Topic_RengaDevGuide_AppProcessing_Selection_Event.html">Событие выбора</a></li></ol></li></ol></li><li class="chapter-item expanded "><a href="Topic_RengaDevGuide_ProjectProcessing.html">Взаимодействие с проектом Renga</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="Topic_RengaDevGuide_ProjectProcessing_RootProps.html">Свойства проекта</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="Topic_RengaDevGuide_ProjectProcessing_RootProps_Building.html">Информация о здании</a></li><li class="chapter-item expanded "><a href="Topic_RengaDevGuide_ProjectProcessing_RootProps_Land.html">Информация об участке</a></li><li class="chapter-item expanded "><a href="Topic_RengaDevGuide_ProjectProcessing_RootProps_Project.html">Информация о проекте</a></li></ol></li><li class="chapter-item expanded "><a href="Topic_RengaDevGuide_ProjectProcessing_OtherProps.html">Прочие свойства</a></li><li class="chapter-item expanded "><a href="Topic_RengaDevGuide_ProjectProcessing_Categories.html">Категории</a></li><li class="chapter-item expanded "><a href="Topic_RengaDevGuide_ProjectProcessing_Styles.html">Стили</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="Topic_RengaDevGuide_ProjectProcessing_Styles_Creation.html">Создание стилей</a></li><li class="chapter-item expanded "><a href="Topic_RengaDevGuide_ProjectProcessing_Styles_Reading.html">Чтение стилей</a></li></ol></li><li class="chapter-item expanded "><a href="Topic_RengaDevGuide_ProjectProcessing_Props0.html">Работа со свойствами</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="Topic_RengaDevGuide_ProjectProcessing_Props0_General.html">Обычные свойства</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="Topic_RengaDevGuide_ProjectProcessing_Props0_General_Creation.html">Создание новых определений свойств</a></li></ol></li></ol></li></ol></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
