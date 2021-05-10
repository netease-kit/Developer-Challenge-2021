package com.logic.utils.room

import androidx.room.Database
import androidx.room.RoomDatabase

@Database(entities = [PathRecord::class], version = 2, exportSchema = false)
abstract class Database : RoomDatabase() {

  abstract fun dao(): Dao
}