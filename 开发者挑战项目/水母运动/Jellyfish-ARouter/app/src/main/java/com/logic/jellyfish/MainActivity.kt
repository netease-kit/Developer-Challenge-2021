package com.logic.jellyfish

import android.os.Bundle
import android.view.KeyEvent
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.alibaba.android.arouter.facade.annotation.Route
import com.logic.chat.ChatFragment
import com.logic.mine.MineFragment
import com.logic.sport.SportFragment
import com.logic.web.FindFragment
import com.logic.web.HomeFragment
import com.logic.web.WebFragment
import kotlinx.android.synthetic.main.activity_main.*
import me.jessyan.autosize.internal.CustomAdapt

@Route(path = "/app/main")
class MainActivity : AppCompatActivity(), CustomAdapt {

  private var lastActiveFragmentTag: String? = null
  private var fragment: Fragment? = null

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)
    setSupportActionBar(toolbar)

    toolbar.title = getString(R.string.home)
    loadFragment(R.id.home)
    initBottomNavigation()
  }

  private fun loadFragment(itemId: Int) {
    val tag = itemId.toString()
    fragment = supportFragmentManager.findFragmentByTag(tag) ?: when (itemId) {
      R.id.home -> {
        HomeFragment()
      }
      R.id.sport -> {
        SportFragment()
      }
      R.id.message -> {
        ChatFragment()
      }
      R.id.find -> {
        FindFragment()
      }
      R.id.mine -> {
        MineFragment()
      }
      else -> {
        null
      }
    }
    fragment?.let {
      val transaction = supportFragmentManager.beginTransaction()
      transaction.setCustomAnimations(R.anim.fade_in, R.anim.fade_out)
      if (lastActiveFragmentTag != null) {
        val lastFragment = supportFragmentManager.findFragmentByTag(lastActiveFragmentTag)
        if (lastFragment != null)
          transaction.hide(lastFragment)
      }
      if (!it.isAdded) {
        transaction.add(R.id.container, it, tag)
      } else {
        transaction.show(it)
      }
      transaction.commit()
      lastActiveFragmentTag = tag
    }
  }


  private fun initBottomNavigation() {
    bottom_nav.setOnNavigationItemSelectedListener {
      when (it.itemId) {
        R.id.home -> {
          toolbar.title = getString(R.string.home)
        }
        R.id.sport -> {
          toolbar.title = getString(R.string.sport)
        }
        R.id.message -> {
          toolbar.title = getString(R.string.message)
        }
        R.id.find -> {
          toolbar.title = getString(R.string.find)
        }
        R.id.mine -> {
          toolbar.title = getString(R.string.mine)
        }
      }
      loadFragment(it.itemId)
      true
    }
  }

  override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
    if (keyCode == KeyEvent.KEYCODE_BACK) {
      fragment?.let {
        if (it is WebFragment && it.onKeyBack()) {
          return true
        }
      }
    }
    return super.onKeyDown(keyCode, event)
  }

  override fun isBaseOnWidth(): Boolean {
    return false
  }

  override fun getSizeInDp(): Float {
    return 640F
  }
}