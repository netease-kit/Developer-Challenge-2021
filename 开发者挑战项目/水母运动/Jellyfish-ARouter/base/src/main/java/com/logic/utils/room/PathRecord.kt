package com.logic.utils.room

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey
import java.util.*

@Entity(tableName = "PathRecord")
data class PathRecord(
  @ColumnInfo(name = "longitude") val longitude: Double,
  @ColumnInfo(name = "latitude") val latitude: Double,
  @ColumnInfo(name = "speed") val speed: Float,
  @ColumnInfo(name = "bearing") val bearing: Float,
  @ColumnInfo(name = "time") val time: Long,
  @PrimaryKey @ColumnInfo(name = "entryid") val id: String = UUID.randomUUID().toString()
)