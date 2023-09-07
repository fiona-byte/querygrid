package paginate

import (
	"math"
	"strconv"
)

type Paginate struct {
	Limit       int `json:"-"`
	Offset      int `json:"-"`
	CurrentPage int `json:"-"`
}

func NewPagination(page, limit string) *Paginate {
	var paginate Paginate
	var err error

	if paginate.Limit, err = strconv.Atoi(limit); err != nil {
		paginate.Limit = 10
	}

	if paginate.Limit <= 0 || paginate.Limit > 10 {
		paginate.Limit = 10
	}

	if paginate.CurrentPage, err = strconv.Atoi(page); err != nil {
		paginate.CurrentPage = 1
	}

	paginate.Offset = paginate.Limit * (paginate.CurrentPage - 1)

	return &paginate
}

func (p *Paginate) TotalPages(count int64) int {
	totalPages := int(math.Ceil(float64(count) / float64(p.Limit)))

	if totalPages <= 0 {
		totalPages = 1
	}

	return totalPages
}
