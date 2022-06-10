export const industryFilters = () => {
    let filtersContainer = document.querySelector('.industry-filters-container');
    if (!filtersContainer) return;
    if (filtersContainer.classList.value.includes('filters-visible')) {
        while (filtersContainer.firstChild) {
            filtersContainer.removeChild(filtersContainer.firstChild);
        }
        filtersContainer.classList.remove('filters-visible');
        return
    }
    let filters = ["Software / Digital", "Finance", "Consulting", "E-Commerce", "Media", "Healthcare", "Energy", "Electronics / Hardware", "Transportation / Logistics", "Manufacturing", "Education"]
    filters.forEach(filter => {
        let domFilter = document.createElement('div');
        domFilter.classList.add('industry-filter');
        let span = document.createElement('span');
        span.textContent = filter;
        let checkbox = document.createElement('div')
        checkbox.classList.add('checkbox')
        checkbox.onclick = () => checkbox.classList.toggle('checked');
        span.onclick = () => checkbox.classList.toggle('checked');
        domFilter.appendChild(checkbox)
        domFilter.appendChild(span)
        filtersContainer.appendChild(domFilter);
    })
    filtersContainer.classList.add('filters-visible');
}

export const renderComparativeAnalysisSubDropDown = () => {
    return (
        <div className="comp-analysis-subdrop-container">
            <div className="comp-analysis-subdropdown-item-container">
                <label htmlFor="" className="comp-analysis-label">Filter by:</label>
                <ul className="comp-analysis-filters">
                    <li className="comp-analysis-filter">
                        <span className="industry-filter-span" onClick={() => industryFilters()}>Industry</span>
                        <div className="industry-filters-container">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export const renderNewProjectSubDropDown = () => {
    return (
        <div className="comp-analysis-subdrop-container">
            <div className="comp-analysis-subdropdown-item-container">
                <label htmlFor="" className="comp-analysis-label">Filter by:</label>
                <ul className="comp-analysis-filters">
                    <li className="comp-analysis-filter">
                        <span className="industry-filter-span" onClick={() => industryFilters()}>Industry</span>
                        <div className="industry-filters-container">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export const renderDashboardSentimentAnalysis = () => {
    return (
        <div className="dashboard-sentiment-analysis-subdrop-container">
            <div className="dash-sent-analysis-subdrop-item-container">

            </div>
        </div>
    )
}

export const renderSubDropDownItems = (items) => {
    return items.map((item, idx) => (
        <div key={item.src + idx} className="subdropdown-item-container">
            <img src={item.src} alt="" className="subdropdown-item-image" />
            <div className="subdropdown-item"></div>
        </div>
    ))
}

export const renderSubDropDown = (items) => {
    return (
        <div className="subdropdown-container">
            {renderSubDropDownItems(items)}
        </div>
    )
}