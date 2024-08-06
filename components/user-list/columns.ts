import type { ColumnDef } from "@tanstack/vue-table"
import type { User } from "~/types/authTypes"
import Button from "../ui/button/Button.vue"
import { ArrowUpDown, Ellipsis } from 'lucide-vue-next';
import DropdownAction from '~/components/user-list/DataTableDrobdown.vue'
import { h } from 'vue'

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header:  () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('name')),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Email', h(ArrowUpDown, { class: 'ml-2 h-4 w-4 text-center' })])
    },
    cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('email')),
  },
  {
    accessorKey: 'status',
    header:  () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('status')),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original

      return h('div', { class: 'relative' }, h(DropdownAction, {
        user,
      }))
    },
  },
]