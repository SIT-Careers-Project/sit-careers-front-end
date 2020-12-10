import React, { useContext } from 'react'

import { Pagination } from '@material-ui/lab'
import { paginationContext } from '../contexts/pagination_context'

type CorePaginationProps = {
  data: Array<string>
  defaultPage?: number
}

const CorePagination = (props: CorePaginationProps) => {
  const { data, defaultPage } = props
  const context = useContext(paginationContext)

  return (
    <div className="flex items-center justify-center w-full mt-5">
      <Pagination
        count={Math.ceil(data.length / context.itemsPerPage)}
        page={context.page}
        onChange={context.setPage}
        defaultPage={defaultPage || 1}
      />
    </div>
  )
}

export default CorePagination
