<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

enum GarantiaTipo {
  Fabricante = 'Fabricante',
  Loja = 'Loja',
  SemGarantia = 'SemGarantia'
}

const schema = z
  .object({
    codigoAlternativo: z
      .string('Código alternativo não pode ser asdf')
      .min(1, 'Código alternativo não pode ser vazio')
      .max(50, 'Código alternativo deve ter no máximo 50 caracteres')
      .regex(/^[a-zA-Z0-9\s]+$/, 'Código alternativo não pode conter caracteres especiais')
      .describe('Código alternativo do Produto.'),

    estoqueMax: z.number().min(0, 'Estoque máximo deve ser maior ou igual a 0').max(200).describe('Quantidade máxima permitida em estoque deste produto.'),

    estoqueMin: z.number().min(0, 'Estoque mínimo deve ser maior ou igual a 0').max(200).describe('Quantidade mínima permitida em estoque deste produto.'),

    garantiaTipo: z.enum(GarantiaTipo).describe('Enum contendo o tipo de garantia do produto.'),

    garantiaDias: z.number().int('Dias de garantia deve ser um número inteiro').min(0, 'Dias de garantia não pode ser negativo').max(99999).describe('Período em dias da garantia.')
  })
  .refine((data) => data.estoqueMax >= data.estoqueMin, {
    message: 'Estoque máximo deve ser maior que estoque mínimo',
    path: ['estoqueMax']
  })
  .refine(
    (data) => {
      if (data.garantiaTipo === GarantiaTipo.SemGarantia) {
        return data.garantiaDias === 0
      }

      return data.garantiaDias > 0
    },
    {
      message: 'Dias de garantia deve ser 0 se tipo for "SemGarantia" e maior que 0 caso contrário',
      path: ['garantiaDias']
    }
  )
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  codigoAlternativo: undefined,
  estoqueMax: undefined,
  estoqueMin: undefined,
  garantiaTipo: GarantiaTipo.Fabricante,
  garantiaDias: undefined
})

const toast = useToast()

const garantiaTipoDataSource = ref(Object.values(GarantiaTipo))

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: 'Success',
    description: 'The form has been submitted.',
    color: 'success'
  })

  console.log(event.data)
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4 mx-auto max-w-7xl" @submit="onSubmit">
    <UFormField label="cod alt" name="codigoAlternativo">
      <UInput v-model="state.codigoAlternativo" />
    </UFormField>

    <div class="flex gap-2">
      <UFormField label="estoque min" name="estoqueMin">
        <UInputNumber v-model="state.estoqueMin" />
      </UFormField>

      <UFormField label="estoque max" name="estoqueMax">
        <UInputNumber v-model="state.estoqueMax" />
      </UFormField>
    </div>

    <UFormField label="garantia tipo" name="garantiaTipo">
      <USelect v-model="state.garantiaTipo" :items="garantiaTipoDataSource" />
    </UFormField>

    <UFormField label="garantia dias" name="garantiaDias">
      <UInputNumber v-model="state.garantiaDias" />
    </UFormField>

    <UButton type="submit"> Enviar </UButton>
  </UForm>
</template>
