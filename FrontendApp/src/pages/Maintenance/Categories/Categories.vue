<template>
    <div>
        <div class="q-pa-md ">
            <q-breadcrumbs>
              <q-breadcrumbs-el icon="home" to="/Admin" />
              <q-breadcrumbs-el label="Maintenance" icon="widgets" />
              <q-breadcrumbs-el label="Categories" icon="list"  />
            </q-breadcrumbs>
        </div>
        <router-view />
    </div>
</template>


