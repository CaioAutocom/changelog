<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'
import { useClipboard } from '@vueuse/core'

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const toast = useToast()
const { copy } = useClipboard()

type Pessoa = {
  id: string
  idAlternativo: string
  nome: string
  apelidoFantasia: string
  fisJur: number
  docCpfCnpj: string
  docIdentidade: string
  ativo: boolean
}

const data = ref<Pessoa[]>([

])

const columns: TableColumn<Pessoa>[] = [
   {
    id: 'actions',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left' },
        h(
          UDropdownMenu,
          {
            content : {
              align: 'start'
            },
            // items: getRowItems(row),
            'aria-label': 'Actions dropdown'
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto',
              'aria-label': 'Actions dropdown'
            })
        )
      )
    }
  },
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => `#${row.getValue('id')}`
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      return new Date(row.getValue('date')).toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const color = {
        paid: 'success' as const,
        failed: 'error' as const,
        refunded: 'neutral' as const
      }[row.getValue('status') as string]

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
        row.getValue('status')
      )
    }
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-right' }, 'Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR'
      }).format(amount)

      return h('div', { class: 'text-right font-medium' }, formatted)
    }
  },

]

// function getRowItems(row: Row<Payment>) {
//   return [
//     {
//       type: 'label',
//       label: 'Actions'
//     },
//     {
//       label: 'Copy payment ID',
//       onSelect() {
//         copy(row.original.id)

//         toast.add({
//           title: 'Payment ID copied to clipboard!',
//           color: 'success',
//           icon: 'i-lucide-circle-check'
//         })
//       }
//     },
//     {
//       type: 'separator'
//     },
//     {
//       label: 'View customer'
//     },
//     {
//       label: 'View payment details'
//     }
//   ]
// }
</script>

<template>
  <UTable :data="data" :columns="columns" class="flex-1 max-w-7xl mx-auto" />
</template>
