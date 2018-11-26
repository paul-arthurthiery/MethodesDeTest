package TP5;

import org.junit.Test;
import TP5.MyList.Elem;
import static org.junit.Assert.*;

import java.util.ArrayList;

public class TestClass {
    @Test
    public void TestElem() {
        ArrayList testArrayList= new ArrayList();
        Elem testElem = new Elem(testArrayList, null);
        assertEquals(testElem.getContent(), testArrayList);
        assertEquals(testElem.getNext(), null);
        Elem nextElem = new Elem(testArrayList, null);
        testElem.setNext(nextElem);
        assertEquals(testElem.getNext(), nextElem);
        ArrayList newArrayList = new ArrayList();
        testElem.setContent(newArrayList);
        assertEquals(testElem.getContent(), newArrayList);
    }
}
