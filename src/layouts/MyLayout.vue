<template>
  <q-layout view="hHh lpr lFf">
    <q-header elevated>
        <q-bar v-if="$q.platform.is.electron" class="q-electron-drag q-pr-none">
          <div>{{ $t('applongname') }}</div>

          <q-space />

          <q-btn class="full-height q-ma-none q-pa-sm no-border-radius" dense flat icon="minimize" @click="minimize" />
          <q-btn class="full-height q-ma-none q-pa-sm no-border-radius" dense flat icon="crop_square" @click="maximize" />
          <q-btn class="full-height q-ma-none q-pa-sm no-border-radius" dense flat icon="close" @click="closeApp" />
        </q-bar>

      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu">
          <q-icon name="menu" />
        </q-btn> -->

        <q-toolbar-title>
          {{ $t('applongname') }}
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>
<!-- 
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2">
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://github.quasar.dev">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github</q-item-label>
            <q-item-label caption>github.com/quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://chat.quasar.dev">
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Discord Chat Channel</q-item-label>
            <q-item-label caption>chat.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://forum.quasar.dev">
          <q-item-section avatar>
            <q-icon name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
            <q-item-label caption>forum.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://twitter.quasar.dev">
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
            <q-item-label caption>@quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://facebook.quasar.dev">
          <q-item-section avatar>
            <q-icon name="public" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Facebook</q-item-label>
            <q-item-label caption>@QuasarFramework</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer> 
-->

    <q-page-container>
      <router-view />

      <q-tabs
        v-model="tab"
        dense
        inline-label
        align="left"
        class="bg-primary text-white fixed-bottom">

        <q-route-tab to="/" exact name="home" icon="home" />
        <q-route-tab v-for="(invoice, i) in openedInvoices" :key="i" :to="'/shop/' + invoice.id" exact name="shopping_cart" icon="shopping_cart" :label="invoice.client" no-caps />
        <q-tab @click="addInvoiceModal = true" name="add_shopping_cart" icon="add_shopping_cart" label="Ajouter" />
      </q-tabs>

    </q-page-container>

    <q-dialog v-model="addInvoiceModal">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ $t('elements.titles.addinvoice') }}</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <p v-for="n in 15" :key="n">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.</p>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat :label="$t('elements.btn.cancel')" color="primary" @click="addInvoiceModal = false"/>
          <q-btn flat :label="$t('elements.btn.ok')" color="primary" @click="addInvoice"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";
import { openURL, QBar, QSpace, QTabs, QTab, QRouteTab, QDialog, QCard, QCardSection, QCardActions, QSeparator } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: false,
      addInvoiceModal: false,
      tab: 'home'
    }
  },
  components: {
    QBar,
    QSpace,
    QTabs,
    QTab,
    QRouteTab,
    QDialog,
    QCard,
    QCardSection,
    QCardActions,
    QSeparator
  },
  methods: {
    addInvoice () {
      this.$router.push('/shop/0004/edit')
    },
    minimize () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize()
      }
    },

    maximize () {
      if (process.env.MODE === 'electron') {
        const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow()

        if (win.isMaximized()) {
          win.unmaximize()
        } else {
          win.maximize()
        }
      }
    },

    closeApp () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
      }
    }
  },
  computed: {
    openedInvoices () {
      return this.invoices.filter((item) => {
        return item.opened
      })
    },
    ...mapGetters({invoices: 'shop/invoices'})
  }
}
</script>

<style>
</style>
