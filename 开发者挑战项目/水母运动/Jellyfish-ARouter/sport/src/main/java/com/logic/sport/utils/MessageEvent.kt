package com.logic.sport.utils

class MessageEvent(val type: Int = -1) {
  companion object {
    const val TYPE_PAUSE_TRACK_SERVICE = 0
    const val TYPE_RESUME_TRACK_SERVICE = 1
  }
}